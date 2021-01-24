import { Typography } from '@material-ui/core';

const InfoText: React.FC<{
  text: string;
  variant?: 'h6' | 'h5';
  marginTop?: string | number;
}> = ({ text, variant, marginTop }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: marginTop || '4em' }}>
      <Typography variant={variant || 'h6'} color="secondary">
        {text}
      </Typography>
    </div>
  );
};

export default InfoText;
