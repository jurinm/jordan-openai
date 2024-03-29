import React, { useCallback, useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const users = [
  { name: 'Olga Vasylieva', address: "vasylieva@gmail.com" },
  { name: 'Stefan Vasylieva', address: "stefan.vv@gmail.com" },
  { name: 'Stef Vasylieva', address: "vas.stef@gmail.com" },
  { name: 'Olga Vasylieva', address: "vasylieva@gmail.com" },
  { name: 'Stefan Vasylieva', address: "stefan.vv@gmail.com" },
];

const SendMessageByGmail: React.FC = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    async function fetchEmails() {
      try {
        const response = await fetch('/api/getEmailsByLabel');
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    }

    fetchEmails();
  }, []);

  return (
    <>
      <p className='text-lg font-base mb-5'>send message by gmail</p>
      <div className="flex flex-col gap-5">
        <Autocomplete
          multiple
          options={users}
          limitTags={3}
          disableCloseOnSelect
          getOptionLabel={(option) => option.address}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              <p>{option.name} <span className='text-[#8a99af] ml-1 text-sm'>({option.address})</span></p>
            </li>
          )}
          style={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} label="* to" helperText="who will this email be sent to?" />
          )}
        />
        <Autocomplete
          multiple
          options={users}
          limitTags={3}
          disableCloseOnSelect
          getOptionLabel={(option) => option.address}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              <p>{option.name} <span className='text-[#8a99af] ml-1 text-sm'>({option.address})</span></p>
            </li>
          )}
          style={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} label="cc" helperText="who should be cc'd on this email?" />
          )}
        />
        <Autocomplete
          multiple
          options={users}
          limitTags={3}
          disableCloseOnSelect
          getOptionLabel={(option) => option.address}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              <p>{option.name} <span className='text-[#8a99af] ml-1 text-sm'>({option.address})</span></p>
            </li>
          )}
          style={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} label="bcc" helperText="who should be bcc'd on this email?" />
          )}
        />
        <TextField
          label="from"
          variant="outlined"
          fullWidth
          helperText="select an email address or alias from your gmail account. defaults to the primary email address."
        />
        <TextField
          label="from name"
          variant="outlined"
          fullWidth
          helperText=""
        />
        <TextField
          label="reply to"
          variant="outlined"
          fullWidth
          helperText="pecify a single reply address other than your own."
        />
        <TextField
          label="* subject (required)"
          variant="outlined"
          fullWidth
          helperText=""
        />
        <TextField
          label="* body"
          className="resize-none w-full"
          multiline
          rows={5}
        />
        <div className="flex justify-end">
          <Button variant="contained" className='!bg-black' endIcon={<SendIcon />}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

export default SendMessageByGmail;
