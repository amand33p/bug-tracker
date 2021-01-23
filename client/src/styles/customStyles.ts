const colors = {
  low: '#ffca1f',
  medium: '#ff9416',
  high: '#ff402c',
  close: '#4ED964',
  open: '#FD3C2A',
};

export const priorityStyles = (priority: 'low' | 'medium' | 'high') => {
  return {
    color: priority === 'low' ? '#333' : '#fff',
    backgroundColor: colors[priority],
    borderRadius: 4,
    fontWeight: 500,
    padding: '0.35em',
    maxWidth: '4em',
  };
};
