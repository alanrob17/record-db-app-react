export const getRecordRating = (rating: string): string => {
  switch (rating) {
    case '****': return 'Indispensible';
    case '***':  return 'Slightly flawed';
    case '**':   return 'Average';
    case '*':    return 'Mediocre';
    default:     return rating;
  }
};

export const getRecordMedia = (media: string): string => {
  switch (media) {
    case 'CD':        return 'CD-Audio';
    case 'CD/Blu-ray': return 'CD-Audio & Blu-ray';
    case 'CD/DVD':    return 'CD-Audio & DVD';
    case 'DVD':       return 'DVD';
    case 'R':
    case 'records':   return 'Record (Vinyl)';
    case 'Blu-ray':   return 'Blu-ray';
    default:          return media;
  }
};

export const getRecordPressing = (pressing: string): string => {
  switch (pressing) {
    case 'Am':  return 'American';
    case 'Aus': return 'Australian';
    case 'Can': return 'Canadian';
    case 'Eng': return 'English';
    case 'Fra': return 'French';
    case 'Ger': return 'German';
    case 'Hk':  return 'Hong Kong';
    case 'Hol': return 'Holland';
    case 'Ita': return 'Italian';
    case 'Jap': return 'Japanese';
    case 'Kor': return 'Korean';
    case 'Swe': return 'Swedish';
    case 'Sws':
    case 'Swi': return 'Swiss';
    default:    return 'Unknown';
  }
};

export const getRecordBoughtDate = (bought: string): string => {
  if (!bought || bought === '' || bought === '01-01-1900') {
    return 'Unknown';
  }
  const day   = bought.substring(0, 2);
  const month = bought.substring(3, 5);
  const year  = bought.substring(6);
  try {
    const date = new Date(`${year}-${month}-${day}`);
    if (isNaN(date.getTime())) return bought;
    return date.toLocaleDateString('en-AU', { timeZone: 'Australia/Melbourne' });
  } catch {
    return bought;
  }
};
