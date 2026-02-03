# 🚀 QUICK START GUIDE - New Architecture

## For Developers

### 1. Running the Project
```bash
npm install
npm run dev
```

### 2. Creating a New Page

#### Public Page
```typescript
// app/(public)/my-page/page.tsx
import { Box, Typography } from '@mui/material'
import Section from '@/components/ui-new/Section'
import Card from '@/components/ui-new/Card'

export default function MyPage() {
  return (
    <Box>
      <Section>
        <Typography variant="h2">My Page</Typography>
        <Card>
          <Box sx={{ p: 3 }}>
            Content here
          </Box>
        </Card>
      </Section>
    </Box>
  )
}
```

#### Admin Page
```typescript
// app/admin/my-page/page.tsx
import { Box, Typography, Button } from '@mui/material'
import Card from '@/components/ui-new/Card'

export default function AdminMyPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>My Admin Page</Typography>
      <Card>
        <Box sx={{ p: 3 }}>
          Admin content
        </Box>
      </Card>
    </Box>
  )
}
```

### 3. Using MUI Components

#### Button
```typescript
import { Button } from '@mui/material'

<Button variant="contained">Primary</Button>
<Button variant="outlined">Secondary</Button>
<Button variant="text">Text</Button>
```

#### Card
```typescript
import Card from '@/components/ui-new/Card'

<Card hover>
  <Box sx={{ p: 3 }}>Content</Box>
</Card>
```

#### Form
```typescript
import { TextField, Button } from '@mui/material'

<TextField label="Name" fullWidth />
<TextField label="Email" type="email" fullWidth />
<Button type="submit" variant="contained">Submit</Button>
```

### 4. Styling with sx Prop

```typescript
<Box sx={{
  bgcolor: 'primary.main',      // Theme color
  color: 'white',                // Direct value
  p: 3,                          // Padding (3 * 8px = 24px)
  mt: 2,                         // Margin top
  borderRadius: 2,               // Border radius
  boxShadow: 1,                  // Shadow from theme
  '&:hover': {                   // Hover state
    bgcolor: 'primary.dark'
  }
}}>
  Content
</Box>
```

### 5. Responsive Design

```typescript
<Box sx={{
  fontSize: { xs: '1rem', md: '1.5rem' },  // Mobile: 1rem, Desktop: 1.5rem
  p: { xs: 2, md: 4 },                      // Mobile: 16px, Desktop: 32px
  display: { xs: 'block', md: 'flex' }      // Mobile: block, Desktop: flex
}}>
  Responsive content
</Box>
```

### 6. Grid Layout

```typescript
import { Grid } from '@mui/material'

<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    Column 1
  </Grid>
  <Grid item xs={12} md={6}>
    Column 2
  </Grid>
</Grid>
```

### 7. Changing Theme Colors

Edit `/lib/theme/theme.ts`:
```typescript
palette: {
  primary: { main: '#YOUR_COLOR' },
  secondary: { main: '#YOUR_COLOR' },
}
```

### 8. Common Patterns

#### Hero Section
```typescript
<Box sx={{ 
  minHeight: '60vh', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #fff0cb, #ffdede)',
  py: 8
}}>
  <Typography variant="h1">Hero Title</Typography>
</Box>
```

#### Stats Section
```typescript
<Grid container spacing={4} sx={{ textAlign: 'center' }}>
  <Grid item xs={6} md={3}>
    <Typography variant="h2" color="primary">500+</Typography>
    <Typography variant="h6" color="text.secondary">Stat Label</Typography>
  </Grid>
</Grid>
```

#### Card Grid
```typescript
<Grid container spacing={3}>
  {items.map(item => (
    <Grid item xs={12} md={4} key={item.id}>
      <Card hover>
        <Box sx={{ p: 3 }}>
          {item.content}
        </Box>
      </Card>
    </Grid>
  ))}
</Grid>
```

### 9. Icons

```typescript
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

<Button startIcon={<AddIcon />}>Add</Button>
<Button endIcon={<DeleteIcon />}>Delete</Button>
```

### 10. Alerts

```typescript
import { Alert } from '@mui/material'

<Alert severity="success">Success message</Alert>
<Alert severity="error">Error message</Alert>
<Alert severity="warning">Warning message</Alert>
<Alert severity="info">Info message</Alert>
```

---

## Common Tasks

### Add a new admin page
1. Create file in `/app/admin/my-page/page.tsx`
2. Add route to AdminLayout sidebar
3. Use MUI components

### Add a new public page
1. Create file in `/app/(public)/my-page/page.tsx`
2. Add link to PublicNavbar
3. Use Section and Card components

### Change brand colors
1. Edit `/lib/theme/theme.ts`
2. Update palette colors
3. Restart dev server

### Add a new component
1. Create in `/components/ui-new/`
2. Use MUI as base
3. Export and use

---

## Troubleshooting

### Styles not applying
- Check if ThemeProvider is in root layout
- Restart dev server
- Clear .next folder

### MUI components not found
- Run `npm install`
- Check imports

### Layout issues
- Check responsive breakpoints
- Use Grid for layouts
- Test on mobile

---

## Resources

- [MUI Documentation](https://mui.com/material-ui/getting-started/)
- [MUI Components](https://mui.com/material-ui/all-components/)
- [MUI Icons](https://mui.com/material-ui/material-icons/)
- [sx Prop](https://mui.com/system/getting-started/the-sx-prop/)

---

**Happy Coding! 🚀**
