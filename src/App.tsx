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

const SUPPORT_EMAIL = 'help@zenithtri-mm.on.spiceworks.com'

const CATEGORY_DATA = [
  { value: 'general', label: 'General' },
  { value: 'technical', label: 'Technical issue' },
  { value: 'account', label: 'Account / access' },
  { value: 'feature', label: 'Feature request' },
  { value: 'other', label: 'Other' },
] as const

type HelpDeskFormValues = {
  contactEmail: string
  summary: string
  description: string
  category: string
  name: string
  incidentDate: string
  facilityName: string
  organization: string
  phone: string
}

function App() {
  const {
    register,
    control,
    handleSubmit,
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
      organization: '',
      phone: '',
    },
  })

  const emailReg = register('contactEmail', {
    required: 'Contact email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email address',
    },
  })
  const summaryReg = register('summary', { required: 'Summary is required' })
  const descriptionReg = register('description', {
    required: 'Description is required',
  })
  const nameReg = register('name', { required: 'Name is required' })
  const facilityReg = register('facilityName', {
    required: 'Facility name is required',
  })
  const orgReg = register('organization', {
    required: 'Organization is required',
  })
  const phoneReg = register('phone', { required: 'Phone is required' })

  const onSubmit = (data: HelpDeskFormValues) => {
    console.info('Help desk submission', data)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f7f6] font-sans text-[#333]">
      <header className="flex w-full flex-col">
        <div className="border-b border-[#e6e6e6] bg-white px-4 py-3 sm:px-10">
          <p className="font-serif text-[1.75rem] font-bold leading-none tracking-[0.1em] text-[#1a4d8c]">
            ZENITH
          </p>
          <p className="mt-1 text-[0.75rem] font-normal text-[#555] sm:text-sm">
            Technical Resource Initiative
          </p>
        </div>
        <div className="relative bg-gradient-to-r from-[#183a6e] via-[#255a9e] to-[#2f6fb8] pb-32 pt-14 text-center shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)] sm:pb-40 sm:pt-16">
          <h1 className="px-4 text-2xl font-semibold tracking-tight text-white sm:text-[1.85rem]">
            Welcome to the Help Desk.
          </h1>
        </div>
      </header>

      <main className="relative z-[1] -mt-24 flex flex-1 justify-center px-4 pb-20 sm:-mt-28 sm:px-8">
        <div className="mx-auto w-full max-w-[min(36rem,92vw)] rounded-xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.07)] sm:p-9 xl:max-w-[min(42rem,34vw)]">
          <Box className="mb-8 text-left">
            <Typography
              variant="h5"
              component="h2"
              className="text-xl font-bold text-[#1a1a1a]"
            >
              HPMS Help Desk သို့အခက်အခဲ/ပြင်ဆင်/ဖြည့်စွက်လိုသည်များကိုအကြောင်းကြားခြင်း
            </Typography>
            <Typography variant="body2" className="mt-3 text-sm leading-relaxed text-[#5a5a5a]">
              အောက်ဖော်ပြပါသတင်းအချက်အလက်များကိုဖြည့်စွက်ပြီး Ticket ကို Submit
              ပြုလုပ်ပါ။ နည်းပညာအထောက်ကူပေးရေးအဖွဲ့မှဆက်သွယ်ဆောင်ရွက်ပေးပါမည်။{' '}
              <a
                className="text-[#1e5a8a] underline decoration-[#1e5a8a]/40 underline-offset-2 hover:text-[#164a72]"
                href={`mailto:${SUPPORT_EMAIL}`}
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </Typography>
          </Box>

          <hr className="mb-6 border-[#e5e5e5]" />

          {isSubmitSuccessful && (
            <div
              className="mb-6 rounded-lg border border-blue-200 bg-blue-50/90 px-4 py-3 text-sm text-blue-950"
              role="status"
            >
              Thank you. Your request has been recorded (demo — connect an API to
              persist tickets).
              <button
                type="button"
                className="ml-2 font-medium text-blue-800 underline decoration-blue-400"
                onClick={() => reset()}
              >
                Submit another
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Contact Email (required)"
                placeholder="you@organization.org"
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
                      // Default en-US placeholders render as YYYY / MM / DD; hide when empty
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
                            label: 'ရက်စွဲ (required)',
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

              <TextField
                label="Organization (အဖွဲ့အစည်း) (required)"
                placeholder="Organization name"
                fullWidth
                variant="outlined"
                error={!!errors.organization}
                helperText={errors.organization?.message}
                name={orgReg.name}
                onChange={orgReg.onChange}
                onBlur={orgReg.onBlur}
                inputRef={orgReg.ref}
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

      <footer className="mt-auto border-t border-[#e5e5e5] bg-[#fafafa] px-4 py-6 text-center text-xs text-[#777]">
        <p className="mb-2">
          <a className="hover:text-[#333]" href="#">
            Privacy Policy
          </a>
          <span className="mx-2 text-[#ccc]">|</span>
          <a className="hover:text-[#333]" href="#">
            Terms of Use
          </a>
        </p>
        <p className="text-[#999]">Powered by Help Desk</p>
      </footer>
    </div>
  )
}

export default App
