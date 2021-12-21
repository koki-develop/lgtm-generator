import { Box } from '@mui/material';
import { Theme } from '@mui/material/styles';

import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';

export default withStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  }),
)(Box);
