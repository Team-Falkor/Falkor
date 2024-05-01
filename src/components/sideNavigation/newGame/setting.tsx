import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FC, InputHTMLAttributes } from 'react';

interface NewGameSettingProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  description: string;
  required?: boolean;
  field: any;

  Button?: JSX.Element;
}

const NewGameSetting: FC<NewGameSettingProps> = ({ description, text, required = false, field, Button, ...props }) => {
  return (
    <FormItem>
      <div className="grid items-center grid-cols-5 gap-4">
        <FormLabel className="text-right">
          {text}
          {required ? '*' : ''}
        </FormLabel>
        <div className="flex flex-row col-span-4 gap-1">
          <FormControl>
            <Input
              placeholder={description}
              required
              {...field}
              {...props}
            />
          </FormControl>
          {Button}
        </div>
      </div>
    </FormItem>
  );
};

export default NewGameSetting;
