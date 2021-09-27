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
  Create,
} from "ra-ui-materialui";
import React, { useEffect } from "react";
import { useGetIdentity } from "react-admin";
import { v4 } from "uuid";

export type TagProps = {};

export const TagList: React.FC<TagProps> = (props: TagProps) => {
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

export const TagEdit: React.FC<TagProps> = (props: TagProps) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextField source={"id"} />
        <TextInput source={"name"} />
      </SimpleForm>
    </Edit>
  );
};

export const TagCreate: React.FC<TagProps> = (props: TagProps) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput disabled source={"id"} defaultValue={v4()} />
        <TextInput source={"name"} />
      </SimpleForm>
    </Create>
  );
};
