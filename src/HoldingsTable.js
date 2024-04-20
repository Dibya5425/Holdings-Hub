import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,} from '@mui/material';

const HoldingsTable = () => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      const response = await axios.get('https://canopy-frontend-task.now.sh/api/holdings');
      setHoldings(response.data.payload);
    };

    fetchHoldings();
  }, []);

  const groupedHoldings = useMemo(() => {
    return holdings.reduce((acc, holding) => {
      if (!acc[holding.asset_class]) {
        acc[holding.asset_class] = [];
      }
      acc[holding.asset_class].push(holding);
      return acc;
    }, {});
  }, [holdings]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="holdings table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={7}>
            Categorize the rows according to their asset class.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Name of the holding</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Ticker</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Asset Class</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Average Price</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Market Price</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Latest Change Percentage</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Market Value in Base CCY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(groupedHoldings).map(([assetClass, holdings]) => (
            <React.Fragment key={assetClass}>
              <TableRow>
                <TableCell colSpan={7} sx={{ fontWeight: 'bold' }}>
                  {assetClass}
                </TableCell>
              </TableRow>
              {holdings.map((holding) => (
                <TableRow key={holding.name}>
                  <TableCell component="th" scope="row">
                    {holding.name}
                  </TableCell>
                  <TableCell>{holding.ticker}</TableCell>
                  <TableCell>{holding.asset_class}</TableCell>
                  <TableCell>{holding.avg_price}</TableCell>
                  <TableCell>{holding.market_price}</TableCell>
                  <TableCell>{holding.latest_chg_pct}%</TableCell>
                  <TableCell>{holding.market_value_ccy}</TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <Typography variant="body2" color="textSecondary">
        Last updated: {new Date().toLocaleString()}
      </Typography>
    </TableContainer>
  );
};

export default HoldingsTable;