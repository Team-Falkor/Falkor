import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Link } from '@tanstack/react-router';
import { FunctionComponent } from 'react';

type NavItemProps =
  | {
      title: string;
      href: string;
      icon: JSX.Element;
      type?: 'link';
    }
  | {
      type: 'button';
      title: string;
      icon: JSX.Element;
    };

const NavItem: FunctionComponent<NavItemProps> = (props) => {
  const { icon, title, type } = props;

  if (!type || type === 'link') {
    const { href } = props;

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
              className: 'rounded-lg [&.active]:bg-muted',
            })}
          >
            <div className="[&>*]:size-5">{icon}</div>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={8}
        >
          {title}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg"
        >
          <div className="[&>*]:size-5">{icon}</div>
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        sideOffset={8}
      >
        {title}
      </TooltipContent>
    </Tooltip>
  );
};

export default NavItem;
