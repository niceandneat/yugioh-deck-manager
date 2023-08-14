import { ReactNode } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

export interface ActionMenu {
  key: string;
  onClick: () => void;
}

interface ActionProps {
  children?: ReactNode;
  menus?: ActionMenu[];
}

export const Action = ({ children, menus }: ActionProps) => {
  if (!menus) return children;

  const menuItems = menus.map(({ key, onClick }) => (
    <ContextMenuItem key={key} onClick={onClick}>
      {key}
    </ContextMenuItem>
  ));

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>{menuItems}</ContextMenuContent>
    </ContextMenu>
  );
};
