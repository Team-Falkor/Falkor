import type {
  AddTorrentResponse,
  ErrorDetails,
  InvokeErrorResponse,
  ListTorrentsResponse,
  RqbitAPI,
  RqbitDesktopConfig,
  TorrentDetails,
  TorrentStats,
} from '@/@types';

import { invoke, type InvokeArgs } from '@tauri-apps/api/tauri';
import { toast } from 'sonner';

/**
 * Represents the error response for an invocation of some operation.
 *
 * @interface InvokeErrorResponse
 */

/**
 * Converts an InvokeErrorResponse to a UI error message and returns a Promise
 * that rejects with the converted error.
 *
 * @param {string} path - The path of the error.
 * @param {InvokeErrorResponse} e - The error response to convert.
 * @returns {Promise<never>} - A Promise that rejects with the converted UI error message.
 */
function errorToUIError(path: string): (e: InvokeErrorResponse) => Promise<never> {
  return (e: InvokeErrorResponse) => {
    console.log(e);
    const reason: ErrorDetails = {
      method: 'INVOKE',
      path: path,
      text: e.human_readable ?? e.toString(),
      status: e.status,
      statusText: e.status_text,
    };
    return Promise.reject(reason);
  };
}

/**
 * Invokes an API with the given name and parameters.
 *
 * @param {string} name - The name of the API to invoke.
 * @param {InvokeArgs} [params] - The parameters to pass to the API.
 * @returns {Promise<Response>} - The result of the API invocation.
 */
export async function invokeAPI<Response>(name: string, params?: InvokeArgs): Promise<Response> {
  console.log('invoking', name, params);
  const result = await invoke<Response>(name, params).catch(errorToUIError(name));
  console.log(result);
  return result;
}

/**
 * Read a file and return its contents as a base64 string.
 *
 * @param {File} file - The File object to read.
 * @returns {Promise<string>} A Promise that resolves with the base64 string if successful, or rejects with an error if unsuccessful.
 */
async function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const base64String = (event?.target?.result as string)?.split(',')[1];
      if (base64String) {
        resolve(base64String);
      } else {
        reject(new Error('Failed to read file as base64.'));
      }
    };

    reader.onerror = function (error) {
      console.log(error);
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Creates a new instance of the RqbitAPI.
 * @param {RqbitDesktopConfig} configuration - The configuration for the RqbitAPI.
 * @return {RqbitAPI} - The new instance of the RqbitAPI.
 */
export const makeAPI = (configuration: RqbitDesktopConfig): RqbitAPI => {
  return {
    /**
     * Returns the URL for streaming logs.
     *
     * @returns {string|null} The URL for streaming logs or null if the listen address is not configured.
     */
    getStreamLogsUrl: () => {
      if (!configuration.http_api) return null;
      if (!configuration.http_api.listen_addr) return null;

      const port = configuration.http_api.listen_addr.split(':')[1];
      if (!port) {
        return null;
      }
      return `http://127.0.0.1:${port}/stream_logs`;
    },
    /**
     * Returns a list of torrents.
     * @async
     * @returns {Promise<ListTorrentsResponse>} A Promise that resolves with the list of torrents.
     */
    listTorrents: async function (): Promise<ListTorrentsResponse> {
      return await invokeAPI<ListTorrentsResponse>('torrents_list');
    },
    /**
     * Retrieves the details of a specific torrent.
     *
     * @async
     * @param {number} id - The ID of the torrent to retrieve details for.
     * @returns {Promise<TorrentDetails>} - A Promise that resolves with the details of the torrent.
     */
    getTorrentDetails: async function (id: number): Promise<TorrentDetails> {
      return await invokeAPI<TorrentDetails>('torrent_details', { id });
    },
    /**
     * Retrieves the statistics of a torrent.
     * @param {number} id - The ID of the torrent.
     * @returns {Promise<TorrentStats>} - A promise that resolves with the torrent statistics.
     */
    getTorrentStats: async function (id: number): Promise<TorrentStats> {
      return await invokeAPI<TorrentStats>('torrent_stats', { id });
    },
    /**
     * Uploads a torrent file or creates a torrent from a URL.
     *
     * @param {File|string} data - The torrent file to upload or the URL of the torrent.
     * @param {Object} opts - Optional parameters for the upload.
     * @returns {Promise<AddTorrentResponse>} A promise that resolves with the response from the server.
     */
    uploadTorrent: async function (data, opts): Promise<AddTorrentResponse> {
      let response;
      if (data instanceof File) {
        const contents = await readFileAsBase64(data);
        response = await invokeAPI<AddTorrentResponse>('torrent_create_from_base64_file', {
          contents,
          opts: opts ?? {},
        });
      } else {
        response = await invokeAPI<AddTorrentResponse>('torrent_create_from_url', {
          url: data,
          opts: opts ?? {},
        });
      }

      toast.success(`Successfully uploaded torrent`, {
        description: `Torrent Name: ${data instanceof File ? data.name : data.length > 50 ? data.slice(0, 50) + '...' : data}`,
      });
      return response;
    },
    /**
     * Pause the torrent.
     *
     * @param {number} id - The ID of the torrent to be paused.
     * @returns {Promise<void>} - A promise that resolves when the torrent is paused.
     */
    pause: function (id: number): Promise<void> {
      toast.info('Paused Torrent Download');
      return invokeAPI<void>('torrent_action_pause', { id });
    },
    /**
     * Starts a torrent action with the given ID.
     *
     * @param {number} id The ID of the torrent to start.
     * @returns {Promise<void>} A Promise that resolves when the action is complete.
     */
    start: function (id: number): Promise<void> {
      toast.info('Resumed Torrent Download');

      return invokeAPI<void>('torrent_action_start', { id });
    },
    /**
     * Forgets a torrent by its ID.
     *
     * @param {number} id - The ID of the torrent to forget.
     *
     * @returns {Promise<void>} A Promise that resolves with no value when the torrent has been forgotten successfully.
     *
     * @throws {Error} If there is an error invoking the API.
     */
    forget: function (id: number): Promise<void> {
      toast.info(`Successfully Forgot Torrent `, {
        description: `Kept the files`,
      });
      return invokeAPI<void>('torrent_action_forget', { id });
    },
    /**
     * Deletes a torrent with the specified ID.
     *
     * @param {number} id - The ID of the torrent to delete.
     * @returns {Promise<void>} A promise that resolves when the deletion is successful.
     */
    delete: function (id: number): Promise<void> {
      toast.info(`Successfully created Note `, {
        description: `Removing the files`,
      });
      return invokeAPI<void>('torrent_action_delete', { id });
    },
  };
};
