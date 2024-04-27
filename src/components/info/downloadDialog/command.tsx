import { Provider } from '@/@types';
import { cn } from '@/lib/utils';
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'cmdk';
import { Check, Command } from 'lucide-react';
import React, { FC } from 'react';

interface DownloadDialogCommandProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProvider: Provider;
  setSelectedProvider: React.Dispatch<React.SetStateAction<Provider>>;
  providers: Array<Provider>;
}

const DownloadDialogCommand: FC<DownloadDialogCommandProps> = ({
  setIsOpen,
  selectedProvider,
  setSelectedProvider,
  providers,
}) => {
  return (
    <Command>
      <CommandInput placeholder="Search providers..." />

      <CommandList>
        <CommandEmpty>No providers found</CommandEmpty>

        <CommandGroup>
          {providers.map((provider) => (
            <CommandItem
              onSelect={() => {
                setSelectedProvider(provider);
                setIsOpen(false);
              }}
              key={provider.value}
            >
              <Check className={cn('mr-2 h-4 w-4', selectedProvider.value !== provider.value && 'text-transparent')} />
              {provider.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default DownloadDialogCommand;
