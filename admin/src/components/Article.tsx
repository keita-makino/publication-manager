import { required } from "ra-core";
import {
  List,
  Datagrid,
  TextField,
  RichTextField,
  ShowButton,
  EditButton,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceArrayInput,
  ReferenceInput,
  NumberField,
  AutocompleteArrayInput,
} from "ra-ui-materialui";
import React from "react";

export type ArticleProps = {};

export const ArticleList: React.FC<ArticleProps> = (props: ArticleProps) => {
  return (
    <List {...props} perPage={50}>
      <Datagrid>
        <TextField source={"id"} />
        <RichTextField source={"name"} />
        <EditButton label={""} />
      </Datagrid>
    </List>
  );
};

export const ArticleEdit: React.FC<ArticleProps> = (props: ArticleProps) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextField source={"id"} />
        <TextInput fullWidth source={"name"} />
        <ReferenceArrayInput
          allowEmpty
          label={"Authors"}
          source={"authors"}
          reference={"Author"}
        >
          <AutocompleteArrayInput optionText={"name"} />
        </ReferenceArrayInput>
        <TextInput
          multiline
          fullWidth
          source={"abstract"}
          validate={required()}
        />
        <DateField source={"date"} />
        <NumberField source={"citation"} />
        <ReferenceInput
          label={"Journal"}
          source={"journalId"}
          reference={"Journal"}
        >
          <SelectInput optionText={"name"} optionValue={"id"} />
        </ReferenceInput>
        <ReferenceArrayInput
          allowEmpty
          label={"Tags"}
          source={"tags"}
          reference={"Tag"}
        >
          <AutocompleteArrayInput optionText={"name"} />
        </ReferenceArrayInput>

        <SelectInput
          source={"status"}
          choices={[
            { id: "raw", name: "Raw" },
            { id: "edited", name: "Edited" },
            { id: "hidden", name: "Hidden" },
          ]}
          validate={required()}
        />
      </SimpleForm>
    </Edit>
  );
};
