const ratePassword = (password: string | undefined): string => {
  console.log('password: ', password);
  let level = 0;
  if (!password) return '';
  if (password.length > 6) level += 1;
  if (/^[\S]{0,}[A-Z]{1}[\S]{0,}$/.test(password)) level += 1;
  if (/^[\S]{0,}[a-z]{1}[\S]{0,}$/.test(password)) level += 1;
  if (/^[\S]{0,}[\W]{1}[\S]{0,}$/.test(password)) level += 1;
  if (/^[\S]{0,}[0-9]{1}[\S]{0,}$/.test(password)) level += 1;

  switch (level) {
    case 0:
    case 1:
    case 2:
      return 'weak';
    case 3:
      return 'medium';
    case 4:
      return 'good';
    case 5:
      return 'strong';
    default:
      return 'weak';
  }
};
export default ratePassword;
