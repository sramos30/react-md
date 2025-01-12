import React, { ReactElement } from "react";
import {
  Form,
  TextField,
  TextFieldWithMessage,
  useNumberField,
} from "@react-md/form";
import { Text } from "@react-md/typography";
import { Grid } from "@react-md/utils";

import Code from "components/Code/Code";

export default function NumberHookExamples(): ReactElement | null {
  const [value1, field1Props] = useNumberField({
    id: "number-field-1",
    disableMessage: true,
  });
  const [value2, field2Props] = useNumberField({
    id: "number-field-2",
  });
  const [value3, field3Props] = useNumberField({
    id: "number-field-3",
    defaultValue: 0,
  });
  const [value4, field4Props] = useNumberField({
    id: "number-field-4",
    min: 0,
    max: 10,
    defaultValue: 0,
    updateOnChange: false,
  });
  const [value5, field5Props] = useNumberField({
    id: "number-field-5",
    min: 0,
    max: 10,
    step: 2,
    defaultValue: 0,
    validateOnChange: true,
  });
  return (
    <Form>
      <Grid columns={1} clone>
        <Text margin="none">
          value1: <Code inline>{`${value1}`}</Code>
        </Text>
        <TextField {...field1Props} label="Field 1" placeholder="0" />
        <Text margin="top">
          value2: <Code inline>{`${value2}`}</Code>
        </Text>
        <TextFieldWithMessage
          {...field2Props}
          label="Field 2"
          placeholder="0"
        />
        <Text margin="none">
          value3: <Code inline>{`${value3}`}</Code>
        </Text>
        <TextFieldWithMessage
          {...field3Props}
          label="Field 3"
          placeholder="0"
        />
        <Text margin="none">
          value4: <Code inline>{`${value4}`}</Code>
        </Text>
        <TextFieldWithMessage
          {...field4Props}
          label="Field 4"
          placeholder="0"
        />
        <Text margin="none">
          value5: <Code inline>{`${value5}`}</Code>
        </Text>
        <TextFieldWithMessage
          {...field5Props}
          label="Field 5"
          placeholder="0"
        />
      </Grid>
    </Form>
  );
}
