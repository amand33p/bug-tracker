import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingSpinner: React.FC<{
  size?: string | number;
  marginTop?: string | number;
}> = ({ size, marginTop }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: marginTop || '3em',
      }}
    >
      <CircularProgress disableShrink size={size || 80} />
    </div>
  );
};

export default LoadingSpinner;
