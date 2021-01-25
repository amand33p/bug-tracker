import CSS from 'csstype';

const colors = {
  low: '#FFD700',
  medium: '#FF8C00',
  high: '#ff402c',
  closed: '#008000',
  open: '#000080',
  closedBg: '#e2ffe2',
  openBg: '#e2e2ff',
};

export const priorityStyles = (
  priority: 'low' | 'medium' | 'high'
): CSS.Properties => {
  return {
    color: priority === 'low' ? '#000' : '#fff',
    backgroundColor: colors[priority],
    borderRadius: '4px',
    fontWeight: 500,
    padding: '0.35em',
    maxWidth: '4em',
  };
};

export const statusStyles = (isResolved: boolean): CSS.Properties => {
  const color = isResolved ? colors.closed : colors.open;
  const backgroundColor = isResolved ? colors.closedBg : colors.openBg;

  return {
    color,
    backgroundColor,
    borderRadius: '4px',
    fontWeight: 500,
    padding: '0.35em',
    maxWidth: '4em',
  };
};
