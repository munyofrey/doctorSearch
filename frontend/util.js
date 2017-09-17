export const doctorSearch = (name, skip, location) => (
  $.ajax({
    method: 'POST',
    url: '/doctors',
    data: {
      name,
      skip,
      location }
    })
);
