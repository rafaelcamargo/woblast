type TableProps = {
  children: React.ReactNode
  caption: React.ReactNode
  className?: string
}

export const Table = ({ children, caption, className }: TableProps) => {
  return (
    <div className="wt-table-wrapper">
      <div className="wt-table-container">
        <table className={buildClassName(className)}>
          <caption>{caption}</caption>
          {children}
        </table>
      </div>
    </div>
  );
};

type TableHeadProps = {
  children: React.ReactNode
  className?: string
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup'
}

export const TableHead = ({ children, className, scope }: TableHeadProps) => {
  return (
    <th className={className} scope={scope || 'col'}>
      {children}
    </th>
  );
};

type TableBodyProps = {
  children: React.ReactNode
  className?: string
}

export const TableBody = ({ children, className }: TableBodyProps) => {
  return (
    <tbody className={className}>
      {children}
    </tbody>
  );
};

type TableRowProps = {
  children: React.ReactNode
  className?: string
}

export const TableRow = ({ children, className }: TableRowProps) => {
  return (
    <tr className={className}>
      {children}
    </tr>
  );
};

type TableCellProps = {
  children: React.ReactNode
  className?: string
}

export const TableCell = ({ children, className }: TableCellProps) => {
  return (
    <td className={className}>
      {children}
    </td>
  );
};

function buildClassName(className?: string) {
  return ['wt-table', className].filter(Boolean).join(' ').trim();
}
