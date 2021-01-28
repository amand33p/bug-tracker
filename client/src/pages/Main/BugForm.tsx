import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
  createNewBug,
  editBug,
  clearSubmitBugError,
  selectBugsState,
} from '../../redux/slices/bugsSlice';
import { BugPayload } from '../../redux/types';
import ErrorBox from '../../components/ErrorBox';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  InputAdornment,
  FormLabel,
  FormControl,
} from '@material-ui/core';
import { useFormStyles } from '../../styles/muiStyles';
import TitleIcon from '@material-ui/icons/Title';
import SubjectIcon from '@material-ui/icons/Subject';

const validationSchema = yup.object({
  title: yup
    .string()
    .required('Required')
    .min(3, 'Must be at least 3 characters')
    .max(60, 'Must be at most 60 characters'),

  description: yup.string().required('Required'),
});

interface BugFormProps {
  closeDialog?: () => void;
  projectId: string;
  isEditMode: boolean;
  currentData?: BugPayload;
  bugId?: string;
}

const BugForm: React.FC<BugFormProps> = ({
  closeDialog,
  isEditMode,
  projectId,
  currentData,
  bugId,
}) => {
  const classes = useFormStyles();
  const dispatch = useDispatch();
  const { submitError, submitLoading } = useSelector(selectBugsState);
  const { register, control, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: currentData?.title || '',
      description: currentData?.description || '',
      priority: currentData?.priority || 'low',
    },
  });

  const handleCreateBug = (data: BugPayload) => {
    dispatch(createNewBug(projectId, data, closeDialog));
  };

  const handleUpdateBug = (data: BugPayload) => {
    dispatch(editBug(projectId, bugId as string, data, closeDialog));
  };

  return (
    <form
      onSubmit={handleSubmit(isEditMode ? handleUpdateBug : handleCreateBug)}
    >
      <TextField
        inputRef={register}
        name="title"
        required
        fullWidth
        type="text"
        label="Bug Title"
        variant="outlined"
        error={'title' in errors}
        helperText={'title' in errors ? errors.title?.message : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TitleIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.fieldMargin}
        multiline
        rows={1}
        rowsMax={4}
        inputRef={register}
        name="description"
        required
        fullWidth
        type="text"
        label="Description"
        variant="outlined"
        error={'description' in errors}
        helperText={'description' in errors ? errors.description?.message : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SubjectIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <Controller
        control={control}
        name="priority"
        as={
          <FormControl className={classes.radioGroupForm}>
            <RadioGroup row defaultValue="low" className={classes.radioGroup}>
              <FormLabel className={classes.radioGroupLabel}>
                Priority:
              </FormLabel>
              <div className={classes.formControlLabels}>
                <FormControlLabel
                  value="low"
                  control={<Radio color="primary" />}
                  label="Low"
                />
                <FormControlLabel
                  value="medium"
                  control={<Radio color="primary" />}
                  label="Medium"
                />
                <FormControlLabel
                  value="high"
                  control={<Radio color="primary" />}
                  label="High"
                />
              </div>
            </RadioGroup>
          </FormControl>
        }
      />
      <Button
        size="large"
        color="primary"
        variant="contained"
        fullWidth
        className={classes.submitBtn}
        type="submit"
        disabled={submitLoading}
      >
        {isEditMode ? 'Update Bug' : 'Create New Bug'}
      </Button>
      {submitError && (
        <ErrorBox
          errorMsg={submitError}
          clearErrorMsg={() => dispatch(clearSubmitBugError())}
        />
      )}
    </form>
  );
};

export default BugForm;
