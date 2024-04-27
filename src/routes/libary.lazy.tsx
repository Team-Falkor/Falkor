import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/libary')({
  component: () => <div>Hello /libarary!</div>,
});
