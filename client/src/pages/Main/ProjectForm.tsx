import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectUsersState } from '../../redux/slices/usersSlice';
import { User } from '../../redux/types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  TextField,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  InputAdornment,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useFormStyles } from '../../styles/muiStyles';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import GroupIcon from '@material-ui/icons/Group';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Required')
    .max(30, 'Must be at most 30 characters'),
});

const ProjectForm = () => {
  const classes = useFormStyles();
  const { users } = useSelector(selectUsersState);
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const [members, setMembers] = useState<string[]>([]);

  const selectMembersOnChange = (e: any, selectedOption: User[]) => {
    setMembers(selectedOption.map((s) => s.id));
  };

  const handleCreateProject = ({ name }: { name: string }) => {
    console.log(name, members);
  };

  return (
    <form onSubmit={handleSubmit(handleCreateProject)}>
      <TextField
        inputRef={register}
        name="name"
        required
        fullWidth
        type="text"
        label="Project Name"
        variant="outlined"
        error={'name' in errors}
        helperText={'name' in errors ? errors.name.message : ''}
        className={classes.textField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LabelImportantIcon color="primary" fontSize="large" />
            </InputAdornment>
          ),
        }}
      />
      <Autocomplete
        multiple
        filterSelectedOptions
        onChange={selectMembersOnChange}
        options={users}
        getOptionLabel={(option) => option.username}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Members"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment
                    position="start"
                    style={{ paddingLeft: '0.4em' }}
                  >
                    <GroupIcon color="primary" fontSize="large" />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(option) => (
          <ListItem dense component="div">
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                {option.username.slice(0, 1)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={option.username}
              primaryTypographyProps={{
                color: 'secondary',
                variant: 'body1',
              }}
            />
          </ListItem>
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              avatar={<Avatar>{option.username.slice(0, 1)}</Avatar>}
              color="secondary"
              variant="outlined"
              label={option.username}
              {...getTagProps({ index })}
            />
          ))
        }
      />
      <Button
        size="large"
        color="primary"
        variant="contained"
        fullWidth
        className={classes.submitBtn}
        type="submit"
      >
        Create New Project
      </Button>
    </form>
  );
};

export default ProjectForm;
