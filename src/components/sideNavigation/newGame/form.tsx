import NewGameSetting from '@/components/sideNavigation/newGame/setting';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { open } from '@tauri-apps/api/dialog';
import { FolderOpen } from 'lucide-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { undefined, z } from 'zod';

const formSchema = z.object({
  gameName: z.string().min(1, { message: 'Required' }),
  gamePath: z.string().min(1, { message: 'Required' }),
  gameArgs: z.string(),
  gameIcon: z.string(),
});

interface NewGameFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewGameForm: FC<NewGameFormProps> = ({ setOpen }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameName: '',
      gamePath: '',
      gameArgs: '',
      gameIcon: '',
    },
  });

  const [gamePath, setGamePath] = useState<string>('');
  const [gameIcon, setGameIcon] = useState<string>('');

  const handlePathButton = async () => {
    const selected = await open({
      multiple: false,
      filters: [{ name: 'Executable', extensions: ['exe'] }],
    });

    if (typeof selected === 'string') {
      setGamePath(selected.replace(/\\/g, '//'));
    }
  };

  const handleIconButton = async () => {
    const selected = await open({
      multiple: false,
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }],
    });

    if (typeof selected === 'string') {
      setGameIcon(selected.replace(/\\/g, '//'));
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="gameName"
          render={({ field }) => (
            <NewGameSetting
              text={'Name'}
              description={'The name of the game'}
              field={field}
              required
            />
          )}
        />

        <FormField
          control={form.control}
          name="gamePath"
          render={({ field }) => (
            <NewGameSetting
              text={'Path'}
              description={'The name of the game'}
              field={undefined}
              value={gamePath}
              onChange={(e) => setGamePath(e.target.value)}
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
              value={gameIcon}
              onChange={(e) => setGameIcon(e.target.value)}
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
      </form>

      <DialogFooter className="pt-2">
        <Button
          variant={'destructive'}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
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
