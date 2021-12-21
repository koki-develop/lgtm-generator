import { Box } from '@material-ui/core';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

export default withStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  }),
)(Box);
