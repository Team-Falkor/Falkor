import NewGameSetting from '@/components/sideNavigation/newGame/setting';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField } from '@/components/ui/form';
import { useShouldUpdateGamesUi } from '@/stores';
import { GameStoreHelper } from '@/utils/stores';
import { zodResolver } from '@hookform/resolvers/zod';
import { open } from '@tauri-apps/api/dialog';
import { FolderOpen, Shuffle } from 'lucide-react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  gameName: z.string().min(1, { message: 'Required' }),
  gamePath: z.string().min(1, { message: 'Required' }),
  gameId: z.string().min(1, { message: 'Required' }),
  gameIcon: z.string().min(1, { message: 'Required' }),
  gameArgs: z.string().optional(),
  gameCommand: z
    .string()
    .optional()
    .refine((s) => !s?.includes(' '), 'No Spaces!'),
});

interface NewGameFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewGameForm: FC<NewGameFormProps> = ({ setOpen }) => {
  const { setShouldUpdateGamesUi } = useShouldUpdateGamesUi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameName: '',
      gamePath: '',
      gameArgs: '',
      gameIcon: '',
      gameId: '',
    },
  });

  const handlePathButton = async () => {
    const selected = await open({
      multiple: false,
      filters: [{ name: 'Executable', extensions: ['exe'] }],
    });

    if (typeof selected === 'string') form.setValue('gamePath', selected.replace(/\\/g, '//'));
  };

  const handleIconButton = async () => {
    const selected = await open({
      multiple: false,
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }],
    });

    if (typeof selected === 'string') form.setValue('gameIcon', selected.replace(/\\/g, '//'));
  };

  const handleShuffleButton = () => {
    // if game name is set create a slug
    if (form.getValues('gameName').length > 0)
      form.setValue('gameId', form.getValues('gameName').split(' ').join('-').toLowerCase());
    else form.setValue('gameId', Math.random().toString(36).substring(2, 15));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const check = await GameStoreHelper.get(values.gameId);
    if (check) {
      form.resetField('gameId');
      toast.info('Game ID already in use');
      return;
    }

    try {
      await GameStoreHelper.add({
        id: values.gameId,
        name: values.gameName,
        path: values.gamePath,
        args: values.gameArgs,
        icon: values.gameIcon,
        command: values.gameCommand,
        lastPlayed: new Date(),
      });

      setShouldUpdateGamesUi(true);
    } catch (error) {
      toast.error('Failed to add game');
    } finally {
      setOpen(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete={'off'}
      >
        <FormField
          control={form.control}
          name="gameName"
          render={({ field }) => (
            <NewGameSetting
              text={'Name'}
              description={'The name of the game'}
              field={field}
              type="search"
              required
            />
          )}
        />

        <FormField
          control={form.control}
          name="gamePath"
          rules={{
            required: {
              value: true,
              message: 'Required',
            },
          }}
          render={({ field }) => (
            <NewGameSetting
              text={'Path'}
              description={'The path to the game'}
              type="search"
              Button={
                <Button
                  size={'icon'}
                  variant={'ghost'}
                  onClick={handlePathButton}
                >
                  <FolderOpen />
                </Button>
              }
              required
              field={field}
            />
          )}
        />

        <FormField
          control={form.control}
          name="gameId"
          render={({ field }) => (
            <NewGameSetting
              text={'Id'}
              description={'game id'}
              required
              field={field}
              type="search"
              Button={
                <Button
                  size={'icon'}
                  variant={'ghost'}
                  onClick={handleShuffleButton}
                >
                  <Shuffle />
                </Button>
              }
            />
          )}
        />

        <FormField
          control={form.control}
          name="gameIcon"
          render={({ field }) => (
            <NewGameSetting
              text={'Icon'}
              description={'The path/or url of the icon'}
              type="search"
              required
              Button={
                <Button
                  size={'icon'}
                  variant={'ghost'}
                  onClick={handleIconButton}
                >
                  <FolderOpen />
                </Button>
              }
              field={field}
            />
          )}
        />

        <FormField
          control={form.control}
          name="gameArgs"
          render={({ field }) => (
            <NewGameSetting
              text={'Arguments'}
              description={'The arguments to pass to the game'}
              field={field}
            />
          )}
        />

        <FormField
          control={form.control}
          name="gameCommand"
          render={({ field }) => (
            <NewGameSetting
              text={'Command'}
              description={'The command to run the game, e.g. wine'}
              field={field}
            />
          )}
        />
      </form>

      <DialogFooter className="pt-2">
        <DialogClose>
          <Button variant={'destructive'}>Cancel</Button>
        </DialogClose>
        <Button
          variant="secondary"
          onClick={form.handleSubmit(onSubmit)}
        >
          Add Game
        </Button>
      </DialogFooter>
    </Form>
  );
};

export default NewGameForm;
