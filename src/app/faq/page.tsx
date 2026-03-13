import { Container, Accordion, AccordionDetails, AccordionSummary, Typography, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    q: "Does QueueCare replace emergency services?",
    a: "No. If symptoms are severe or life-threatening, users must call emergency services immediately.",
  },
  {
    q: "How is urgency calculated?",
    a: "Urgency score is based on pain level, breathing issues, fever, and age risk weighting.",
  },
  {
    q: "Can clinics edit queue estimates?",
    a: "Yes. The model accepts manual override by authorized clinic operators.",
  },
  {
    q: "Why include this in a portfolio?",
    a: "It demonstrates product strategy, API logic, and healthcare UX under real constraints.",
  },
];

export default function FaqPage() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>FAQ and policy notes</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          This section handles common safety and trust questions.
        </Typography>
      </Box>

      {faqs.map((item) => (
        <Accordion key={item.q}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>{item.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">{item.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
