export async function reverseGeocodeCurrentLocation(position) {
  const params = new URLSearchParams({ localityLanguage: 'en' });

  if (position?.latitude != null && position?.longitude != null) {
    params.set('latitude', String(position.latitude));
    params.set('longitude', String(position.longitude));
  }

  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error('Unable to identify the current city.');
  }

  const result = await response.json();
  const latitude = Number(result.latitude);
  const longitude = Number(result.longitude);
  const name = result.city || result.locality || result.principalSubdivision;

  return {
    name,
    admin1: result.principalSubdivision,
    latitude: Number.isFinite(latitude) ? latitude : null,
    longitude: Number.isFinite(longitude) ? longitude : null,
  };
}
