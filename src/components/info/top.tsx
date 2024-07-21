import { infoHLTBProps, InfoItadProps, InfoProps } from "@/@types";
import IGDBImage from "@/components/IGDBImage";
import CollectionDropdown from "@/components/info/Collection";
import DownloadDialog from "@/components/info/downloadDialog";
import QuickInfo from "@/components/info/quickInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { IGDBReturnDataType } from "@/utils/api/igdb/types";
import { FC } from "react";
import HLTBComponent from "../hltb";

type InfoTopProps = InfoProps &
  InfoItadProps & {
    data: IGDBReturnDataType | undefined;
    isReleased: boolean;
  };

const InfoTop: FC<InfoTopProps & infoHLTBProps> = (props) => {
  const {
    data,
    isReleased,
    isPending,
    error,
    itadData,
    itadError,
    itadPending,
    hltbData,
    hltbError,
    hltbPending,
  } = props;

  if (error) return null;

  return (
    <div className="sm:-mt-28 sm:flex sm:items-start sm:space-x-5">
      <div className="relative flex">
        {isPending && <Skeleton className="rounded-lg w-[230px] h-80" />}
        {!isPending && (
          <IGDBImage
            imageId={data!.cover?.image_id ?? ""}
            alt={data!.name}
            className="object-cover rounded-lg h-80"
            imageSize={"cover_big"}
          />
        )}
      </div>

      <div className="w-full mt-16 sm:min-w-0 sm:flex-1 sm:items-center sm:justify-start sm:pb-1">
        <section className="flex items-end justify-between w-full gap-3">
          {isPending && <Skeleton className="w-56 h-10" />}
          {!isPending && (
            <h1 className="text-2xl font-bold truncate">{data!.name}</h1>
          )}

          <div className="flex justify-end gap-4">
            {isPending && <Skeleton className="w-32 h-10" />}
            {!isPending && !!data && <CollectionDropdown game={data} />}
            {isPending && <Skeleton className="w-32 h-10" />}
            {!isPending && (
              <DownloadDialog
                title={data!.name}
                isReleased={isReleased}
                websites={data!.websites}
                itadData={itadData}
                itadError={itadError}
                itadPending={itadPending}
              />
            )}
          </div>
        </section>

        <div className="mt-5 w-full h-full gap-3.5 justify-between flex flex-col">
          <QuickInfo
            data={data}
            error={error}
            isPending={isPending}
            isReleased={isReleased}
          />

          {!!hltbData && !hltbError && !hltbPending && (
            <div className="w-full ">
              <HLTBComponent
                times={[
                  Math.floor(hltbData.comp_main / 60 / 60),
                  Math.floor(hltbData.comp_plus / 60 / 60),
                  Math.floor(hltbData.comp_100 / 60 / 60),
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoTop;
