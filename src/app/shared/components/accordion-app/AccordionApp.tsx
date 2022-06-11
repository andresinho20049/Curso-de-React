import { Accordion, AccordionDetails, AccordionSummary, Icon, Typography } from "@mui/material"
import { ReactNode, useState } from "react";

interface IAccordionAppProps {
    title: string;
    children: ReactNode;
}

export const AccordionApp = ({
    title,
    children
}:IAccordionAppProps) => {

    const [state, setState] = useState(false);

    return (
        <Accordion expanded={state} onChange={() => setState(!state)}>
        <AccordionSummary expandIcon={<Icon>expand_less</Icon>} >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    )
}