import { useState } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  createTheme,
  ThemeProvider,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Box
} from '@mui/material';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const isNumber = (value) =>
  !isNaN(parseFloat(value)) && isFinite(value) && value > 0;

function App() {
  const [bankroll, setBankroll] = useState(90);
  const [lives, setLives] = useState(2);
  const [increment, setIncrement] = useState(1);
  const [winOdds, setWinOdds] = useState(18 / 37);

  const round = (value) => {
    return Math.floor(value / increment) * increment;
  };

  const optimalBet = (n) => {
    if (!isNumber(bankroll) || !isNumber(lives)) {
      return 'N/A';
    } else {
      const bet = parseFloat(bankroll) / (2 ** parseFloat(n) - 1);
      return round(bet);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Stack direction="column" spacing={2} marginBottom={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            sx={{ width: '100%' }}
            id="bankroll"
            label="Bankroll"
            variant="outlined"
            onChange={(event) => {
              setBankroll(event.target.value);
            }}
            error={!isNumber(bankroll)}
            helperText={!isNumber(bankroll) ? 'Please enter a number' : ''}
            value={bankroll}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }
            }}
          />
          <FormControl fullWidth sx={{ width: '100%' }}>
            <InputLabel id="increment-label">Rounding Increment</InputLabel>
            <Select
              labelId="increment-label"
              id="increment"
              value={increment}
              label="Rounding Increment"
              onChange={(event) => setIncrement(event.target.value)}
              align="left"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2.5}>2.50</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ width: '100%' }}>
            <InputLabel id="win-odds-label">Game</InputLabel>
            <Select
              labelId="win-odds-label"
              id="win-odds"
              value={winOdds}
              label="Game"
              onChange={(event) => setWinOdds(event.target.value)}
              align="left"
            >
              <MenuItem value={18 / 37}>single zero roulette</MenuItem>
              <MenuItem value={18 / 38}>double zero roulette</MenuItem>
              <MenuItem value={0.493}>baccarat player bet</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Box sx={{ width: '100%' }}>
          <Typography id="lives-label" align="left">
            Lives
          </Typography>
          <Slider
            id="lives-slider"
            label="Lives"
            value={lives}
            onChange={(_event, value) => {
              setLives(value);
            }}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={12}
            aria-labelledby="lives-label"
          />
        </Box>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="end"
          alignItems="center"
        >
          <Typography variant="body1" align="right">
            +{optimalBet(lives)}
          </Typography>
          <Button
            variant="contained"
            id="calculate"
            onClick={() => {
              if (!isNumber(bankroll) || !isNumber(lives)) {
                return;
              }
              setBankroll(parseFloat(bankroll) + optimalBet(lives));
            }}
          >
            Next Bet
          </Button>
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Lives</TableCell>
                <TableCell align="right">Bet</TableCell>
                <TableCell align="right">Div</TableCell>
                <TableCell align="right">Chance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <TableRow key={n}>
                  <TableCell>{n}</TableCell>
                  <TableCell align="right">{optimalBet(n)}</TableCell>
                  <TableCell align="right">{2 ** n - 1}</TableCell>
                  <TableCell align="right">
                    {((1 - winOdds) ** n * 100).toFixed(3) + '%'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
