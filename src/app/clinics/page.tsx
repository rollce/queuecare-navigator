"use client";

import { Chip, Container, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Clinic {
  id: string;
  name: string;
  district: string;
  waitMinutes: number;
  specialties: string[];
  openNow: boolean;
}

export default function ClinicsPage() {
  const [urgency, setUrgency] = useState<string>("");
  const [rows, setRows] = useState<Clinic[]>([]);

  async function loadData(nextUrgency = "") {
    const query = nextUrgency ? `?urgency=${nextUrgency}` : "";
    const response = await fetch(`/api/clinics${query}`);
    const payload = await response.json();
    setRows(payload.clinics ?? []);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData();
  }, []);

  async function onUrgencyChange(event: SelectChangeEvent<string>) {
    const value = event.target.value;
    setUrgency(value);
    await loadData(value);
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h3" sx={{ fontWeight: 700 }}>Clinic map by queue time</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Sort options by urgency profile and current operational capacity.
      </Typography>

      <FormControl sx={{ mb: 3, minWidth: 240 }}>
        <InputLabel>Filter by urgency</InputLabel>
        <Select value={urgency} label="Filter by urgency" onChange={onUrgencyChange}>
          <MenuItem value="">No filter</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>

      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>District</TableCell>
              <TableCell>Wait (min)</TableCell>
              <TableCell>Specialties</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.district}</TableCell>
                <TableCell>{row.waitMinutes}</TableCell>
                <TableCell>{row.specialties.join(", ")}</TableCell>
                <TableCell>
                  <Chip size="small" label={row.openNow ? "Open" : "Closed"} color={row.openNow ? "success" : "default"} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
