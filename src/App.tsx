import { useEffect } from 'react';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { DateFieldProps } from '@mui/x-date-pickers/DateField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { Controller, useForm } from 'react-hook-form'

const SUPPORT_EMAIL = 'helpdesk@zenithtri.com '

const CATEGORY_DATA = [
  { value: 'general', label: 'General' },
  { value: 'technical', label: 'Technical issue' },
  { value: 'account', label: 'Account / access' },
  { value: 'feature', label: 'Feature request' },
  { value: 'other', label: 'Other' },
] as const

interface District {
  id: string;     
  name: string;
  state_id: string;
}

interface Township {
  id: string;
  name: string;
  district_id: string; 
}

type HelpDeskFormValues = {
  contactEmail: string
  summary: string
  description: string
  category: string
  name: string
  incidentDate: string
  facilityName: string
  phone: string
  stateId: string | ''
  districtId: string | ''
  townshipId: string | ''
}

const states = [
  { id: "MMR001", name: "Kachin" }, 
  { id: "MMR005", name: "Sagaing" },
  { id: "MMR014", name: "Shan (South)" },
  { id: "MMR015", name: "Shan (North)" }
];

const districts: District[] = [
  { id: "MMR001D002", name: "Mohnyin", state_id: "MMR001" },
  { id: "MMR005D003", name: "Monywa", state_id: "MMR005" },
  { id: "MMR005D005", name: "Kale", state_id: "MMR005" },
  { id: "MMR014D001", name: "Taunggyi", state_id: "MMR014" },
  { id: "MMR015S001", name: "Pa Laung Self-Administered Zone", state_id: "MMR015" },

];


const townships: Township[] = [
  { id: "MMR001009", name: "Hpakant", district_id: "MMR001D002" },
  { id: "MMR005012", name: "Monywa", district_id: "MMR005D003" },
  { id: "MMR014001", name: "Taunggyi", district_id: "MMR014D001" },
  { id: "MMR005027", name: "Kale", district_id: "MMR005D005" },
  { id: "MMR015016", name: "Namhsan", district_id: "MMR015S001" }
];

export default function HelpDeskForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<HelpDeskFormValues>({
    defaultValues: {
      contactEmail: '',
      summary: '',
      description: '',
      category: '',
      name: '',
      incidentDate: '',
      facilityName: '',
      phone: '',
      stateId: '',
      districtId: '',
      townshipId: '',
    },
  });
  

  const selectedStateId = watch('stateId');
  const selectedDistrictId = watch('districtId');

  useEffect(() => {
    setValue('districtId', '');
    setValue('townshipId', '');
  }, [selectedStateId, setValue]);

  useEffect(() => {
    setValue('townshipId', '');
  }, [selectedDistrictId, setValue]);


  const filteredDistricts = districts.filter(d => d.state_id === selectedStateId);
  const filteredTownships = townships.filter(t => t.district_id === selectedDistrictId);

  const emailReg = register('contactEmail', {
    required: 'Contact email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email address',
    },
  });
  const summaryReg = register('summary', { required: 'Summary is required' });
  const descriptionReg = register('description', { required: 'Description is required' });
  const nameReg = register('name', { required: 'Name is required' });
  const facilityReg = register('facilityName', { required: 'Facility name is required' });
  const phoneReg = register('phone', { required: 'Phone is required' });

 const onSubmit = async (formData: HelpDeskFormValues) => {
  try {
  
    const apiUrl = import.meta.env.VITE_API_URL; 
    const stateName = states.find(s => s.id === formData.stateId)?.name || '';
    const districtName = districts.find(d => d.id === formData.districtId)?.name || '';
    const townshipName = townships.find(t => t.id === formData.townshipId)?.name || '';

    const payloadData = {
        ...formData,
        stateId: stateName,      
        districtId: districtName, 
        townshipId: townshipName  
      };

    const response = await fetch(apiUrl, {
      method: 'POST',
      mode: 'cors', 
      headers: { 
        'Content-Type': 'text/plain;charset=utf-8' 
      },
      body: JSON.stringify(payloadData),
    });

    const result = await response.json();
    if (result.status === 'success') {
      alert(`Ticket တင်သွင်းမှု အောင်မြင်ပါသည်။ သင်၏ Ticket ID: မှာ ${result.ticketId} ဖြစ်ပါသည်။`);
      reset();
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Ticket ပို့ရန် အခက်အခဲရှိနေပါသည်။ နောက်မှ ပြန်ကြိုးစားကြည့်ပါ။");
  }
};

  return (
    <div className="tw:flex tw:min-h-screen tw:flex-col tw:bg-[#f4f7f6] tw:font-sans tw:text-[#333]">
      <header className="tw:flex tw:w-full tw:flex-col">
        <div className="tw:border-b tw:border-[#e6e6e6] tw:bg-white tw:px-4 tw:py-3 tw:sm:px-10">
          <p className="tw:font-serif tw:text-[1.75rem] tw:font-bold tw:leading-none tw:tracking-[0.1em] tw:text-[#1a4d8c]">
            ZENITH
          </p>
          <p className="tw:mt-1 tw:text-[0.75rem] tw:font-normal tw:text-[#555] tw:sm:text-sm">
            Technical Resource Initiative
          </p>
        </div>
        <div className="tw:relative tw:bg-gradient-to-r tw:from-[#183a6e] tw:via-[#255a9e] tw:to-[#2f6fb8] tw:pb-32 tw:pt-14 tw:text-center tw:shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)] tw:sm:pb-40 tw:sm:pt-16">
          <h1 className="tw:px-4 tw:text-2xl tw:font-semibold tw:tracking-tight tw:text-white tw:sm:text-[1.85rem]">
            Welcome to the Help Desk.
          </h1>
        </div>
      </header>

      <main className="tw:relative tw:z-[1] tw:-mt-24 tw:flex tw:flex-1 tw:justify-center tw:px-3 tw:pb-20 tw:sm:-mt-28 tw:sm:px-8">
        <div className="tw:mx-auto tw:w-full tw:max-w-[min(48rem,96vw)] tw:rounded-xl tw:border tw:border-slate-200/90 tw:bg-white tw:p-6 tw:shadow-[0_8px_30px_rgba(15,23,42,0.07)] tw:sm:p-9">
          <Box className="tw:mb-8 tw:text-left">
            <Typography
              variant="h5"
              component="h2"
              className="tw:text-xl tw:font-bold tw:text-[#1a1a1a]"
            >
              HPMS Help Desk သို့အခက်အခဲ/ပြင်ဆင်/ဖြည့်စွက်လိုသည်များကိုအကြောင်းကြားခြင်း
            </Typography>
            <Typography variant="body2" className="tw:mt-3 tw:text-sm tw:leading-relaxed tw:text-[#5a5a5a]" style={{marginTop: '12px'}}>
              အောက်ဖော်ပြပါသေချာသောအချက်အလက်များကိုဖြည့်စွက်ပြီး Ticket ကို Submit
              ပြုလုပ်ပါ။ နည်းပညာအထောက်ကူပေးရေးအဖွဲ့မှဆက်သွယ်ဆောင်ရွက်ပေးပါမည်။{' '}You may also send tickets directly to {' '}
              <a
                className="tw:text-[#1e5a8a] tw:underline tw:decoration-[#1e5a8a]/40 tw:underline-offset-2 tw:hover:text-[#164a72]"
                href={`mailto:${SUPPORT_EMAIL}`}
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </Typography>
          </Box>

          <hr className="tw:mb-6 tw:border-[#e5e5e5]" />

          {isSubmitSuccessful && (
            <div
              className="tw:mb-6 tw:rounded-lg tw:border tw:border-blue-200 tw:bg-blue-50/90 tw:px-4 tw:py-3 tw:text-sm tw:text-blue-950"
              role="status"
            >
              Thank you. Your request has been recorded.
              <button
                type="button"
                className="tw:ml-2 tw:font-medium tw:text-blue-800 tw:underline tw:decoration-blue-400"
                onClick={() => reset()}
              >
                Submit another
              </button>
            </div>
          )}

          <form className="tw:flex tw:flex-col" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Contact Email (required)"
                type="email"
                autoComplete="email"
                fullWidth
                variant="outlined"
                error={!!errors.contactEmail}
                helperText={errors.contactEmail?.message}
                name={emailReg.name}
                onChange={emailReg.onChange}
                onBlur={emailReg.onBlur}
                inputRef={emailReg.ref}
              />

               <Controller
                name="category"
                control={control}
                rules={{ required: 'Please choose a category' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.category}>
                    <InputLabel id="category-label">Category (required)</InputLabel>
                    <Select
                      labelId="category-label"
                      label="Category (required)"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      {CATEGORY_DATA.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.category?.message ? (
                      <FormHelperText>{errors.category.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />

              <TextField
                label="Summary (required)"
                placeholder="Short title for your request"
                fullWidth
                variant="outlined"
                error={!!errors.summary}
                helperText={errors.summary?.message}
                name={summaryReg.name}
                onChange={summaryReg.onChange}
                onBlur={summaryReg.onBlur}
                inputRef={summaryReg.ref}
              />

              <TextField
                label="Description (required)"
                placeholder="Describe the issue or request in detail"
                fullWidth
                variant="outlined"
                multiline
                minRows={5}
                error={!!errors.description}
                helperText={errors.description?.message}
                name={descriptionReg.name}
                onChange={descriptionReg.onChange}
                onBlur={descriptionReg.onBlur}
                inputRef={descriptionReg.ref}
              />

             
              <TextField
                label="Name (required)"
                placeholder="Your full name"
                autoComplete="name"
                fullWidth
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
                name={nameReg.name}
                onChange={nameReg.onChange}
                onBlur={nameReg.onBlur}
                inputRef={nameReg.ref}
              />

              <Controller
                name="incidentDate"
                control={control}
                rules={{ required: 'Date is required' }}
                render={({ field }) => (
                  <DatePicker
                    format="YYYY-MM-DD"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(v) =>
                      field.onChange(v ? v.format('YYYY-MM-DD') : '')
                    }
                    localeText={{
                      toolbarTitle: 'SELECT DATE',
                      fieldYearPlaceholder: () => '',
                      fieldMonthPlaceholder: () => '',
                      fieldDayPlaceholder: () => '',
                    }}
                    slotProps={{
                      toolbar: {
                        hidden: false,
                        toolbarPlaceholder: 'Enter date',
                        sx: {
                          bgcolor: '#008394',
                          color: '#fff',
                          '& .MuiTypography-overline': {
                            color: 'rgba(255,255,255,0.9)',
                            letterSpacing: '0.08em',
                          },
                          '& .MuiDatePickerToolbar-title': { color: '#fff' },
                        },
                      },
                      field: {
                        onBlur: field.onBlur,
                        slotProps: {
                          textField: {
                            label: 'ဖြေရှင်းပေးရန်မျှော်မှန်းသည့်နေ့ (required)',
                            placeholder: 'ရက်စွဲ ရွေးချယ်ပါ (required)',
                            fullWidth: true,
                            variant: 'outlined',
                            error: !!errors.incidentDate,
                            helperText: errors.incidentDate?.message,
                          },
                        },
                        openPickerButtonPosition: 'start',
                      } as Pick<DateFieldProps, 'onBlur' | 'slotProps'>,
                    }}
                  />
                )}
              />

              <TextField
                label="Facility Name (required)"
                placeholder="Facility or site name"
                fullWidth
                variant="outlined"
                error={!!errors.facilityName}
                helperText={errors.facilityName?.message}
                name={facilityReg.name}
                onChange={facilityReg.onChange}
                onBlur={facilityReg.onBlur}
                inputRef={facilityReg.ref}
              />

              <Controller
                name="stateId"
                control={control}
                rules={{ required: 'ပြည်နယ်/တိုင်း ရွေးချယ်ရန် လိုအပ်ပါသည်' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.stateId}>
                    <InputLabel id="state-label">ပြည်နယ်/တိုင်း (required)</InputLabel>
                    <Select
                      labelId="state-label"
                      label="ပြည်နယ်/တိုင်း (required)"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      <MenuItem value=""><em>-- ရွေးချယ်ရန် --</em></MenuItem>
                      {states.map(s => (
                        <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                      ))}
                    </Select>
                    {errors.stateId?.message && (
                      <FormHelperText>{errors.stateId.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="districtId"
                control={control}
                rules={{ required: 'ခရိုင် ရွေးချယ်ရန် လိုအပ်ပါသည်' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.districtId} disabled={!selectedStateId}>
                    <InputLabel id="district-label">ခရိုင် (required)</InputLabel>
                    <Select
                      labelId="district-label"
                      label="ခရိုင် (required)"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      <MenuItem value=""><em>-- ရွေးချယ်ရန် --</em></MenuItem>
                      {filteredDistricts.map(d => (
                        <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
                      ))}
                    </Select>
                    {errors.districtId?.message && (
                      <FormHelperText>{errors.districtId.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="townshipId"
                control={control}
                rules={{ required: 'မြို့နယ် ရွေးချယ်ရန် လိုအပ်ပါသည်' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.townshipId} disabled={!selectedDistrictId}>
                    <InputLabel id="township-label">မြို့နယ် (required)</InputLabel>
                    <Select
                      labelId="township-label"
                      label="မြို့နယ် (required)"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      <MenuItem value=""><em>-- ရွေးချယ်ရန် --</em></MenuItem>
                      {filteredTownships.map(t => (
                        <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                      ))}
                    </Select>
                    {errors.townshipId?.message && (
                      <FormHelperText>{errors.townshipId.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              <TextField
                label="Phone (required)"
                placeholder="+95 … or local number"
                type="tel"
                autoComplete="tel"
                fullWidth
                variant="outlined"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                name={phoneReg.name}
                onChange={phoneReg.onChange}
                onBlur={phoneReg.onBlur}
                inputRef={phoneReg.ref}
              />

              <Button
                type="submit"
                variant="contained"
                disableElevation
                sx={{
                  alignSelf: 'flex-start',
                  mt: 2.5,
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  px: 2.25,
                  py: 1,
                  minHeight: 34,
                  borderRadius: '4px',
                  bgcolor: '#0083a4',
                  color: '#fff',
                  '&:hover': { bgcolor: '#296073', color: '#fff' },
                }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </div>
      </main>
       <footer className="tw:mt-auto tw:border-t tw:border-[#e5e5e5] tw:bg-[#fafafa] tw:px-4 tw:py-6 tw:text-center tw:text-xs tw:text-[#777]">
        <p className="tw:mb-2">
          <a className="tw:hover:text-[#333]" href="#">
            Privacy Policy
          </a>
          <span className="tw:mx-2 tw:text-[#ccc]">|</span>
          <a className="tw:hover:text-[#333]" href="#">
            Terms of Use
          </a>
        </p>
        <p className="tw:text-[#999]">Powered by Help Desk</p>
      </footer>
    </div>
  )
}
    
      
