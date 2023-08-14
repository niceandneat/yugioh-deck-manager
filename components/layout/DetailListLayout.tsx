import { ReactNode } from 'react';

interface DetailListLayoutProps {
  detail?: ReactNode;
  list?: ReactNode;
}

export const DetailListLayout = ({ detail, list }: DetailListLayoutProps) => {
  return (
    <div>
      <div className="fixed left-0 top-[--header-height] w-[332px]">
        <div className="p-4">{detail}</div>
      </div>
      <div className="ml-[316px]">{list}</div>
    </div>
  );
};
