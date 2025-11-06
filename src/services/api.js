import { read, write, ensure } from './storage.js'

const seed = {
  activities: [
    // MER & CROISIÈRES
    { id:'nice-sailing', title:'Sortie voilier au coucher du soleil', city:'Nice', category:'mer', price:69, rating:4.8, reviews:312, lat:43.695, lng:7.265, image:'https://images.unsplash.com/photo-1501959915551-4e8a04a0bf5e', tags:['mer','coucher de soleil','romantique'], popularity:0.92, addedAt:'2025-05-10', description:'Croisière en voilier au coucher du soleil avec apéritif' },
    { id:'cannes-islands', title:'Îles de Lérins : navette + balade', city:'Cannes', category:'mer', price:39, rating:4.6, reviews:188, lat:43.522, lng:7.044, image:'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', tags:['famille','nature'], popularity:0.75, addedAt:'2025-06-02', description:'Navette vers les îles de Lérins avec visite libre' },
    { id:'nice-diving', title:'Plongée sous-marine à Nice', city:'Nice', category:'mer', price:85, rating:4.7, reviews:245, lat:43.695, lng:7.265, image:'https://images.unsplash.com/photo-1559827260-dc66d52bef19', tags:['mer','plongée','sport'], popularity:0.88, addedAt:'2025-06-15', description:'Baptême de plongée avec moniteur certifié' },
    { id:'trans-cote-azur-nice', title:'Trans Côte d\'Azur : Nice - Monaco', city:'Nice', category:'mer', price:45, rating:4.5, reviews:567, lat:43.695, lng:7.265, image:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', tags:['mer','croisière','monaco'], popularity:0.89, addedAt:'2025-04-20', description:'Croisière côtière Nice-Monaco avec commentaires' },
    { id:'trans-cote-azur-cannes', title:'Trans Côte d\'Azur : Cannes - Saint-Tropez', city:'Cannes', category:'mer', price:55, rating:4.6, reviews:423, lat:43.552, lng:7.017, image:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', tags:['mer','croisière','saint-tropez'], popularity:0.87, addedAt:'2025-05-05', description:'Croisière vers Saint-Tropez depuis Cannes' },
    { id:'horizon-lerins', title:'Horizon Lérins : Île Saint-Honorat', city:'Cannes', category:'mer', price:18, rating:4.7, reviews:298, lat:43.522, lng:7.044, image:'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', tags:['mer','île','abbaye'], popularity:0.83, addedAt:'2025-05-12', description:'Navette vers l\'île Saint-Honorat et son abbaye' },
    
    // MUSÉES & FONDATIONS
    { id:'musee-matisse', title:'Musée Matisse', city:'Nice', category:'culture', price:12, rating:4.8, reviews:892, lat:43.710, lng:7.275, image:'https://images.unsplash.com/photo-1519681393784-d120267933ba', tags:['culture','musée','art'], popularity:0.94, addedAt:'2025-01-10', description:'Collection permanente et expositions temporaires' },
    { id:'mamac-nice', title:'MAMAC - Musée d\'Art Moderne', city:'Nice', category:'culture', price:12, rating:4.6, reviews:654, lat:43.695, lng:7.275, image:'https://images.unsplash.com/photo-1519681393784-d120267933ba', tags:['culture','musée','art moderne'], popularity:0.88, addedAt:'2025-01-15', description:'Art moderne et contemporain des années 1960-1970' },
    { id:'musee-picasso-antibes', title:'Musée Picasso Antibes', city:'Antibes', category:'culture', price:18, rating:4.7, reviews:756, lat:43.580, lng:7.123, image:'https://images.unsplash.com/photo-1519681393784-d120267933ba', tags:['culture','musée','picasso'], popularity:0.91, addedAt:'2025-02-01', description:'Collection Picasso dans le château Grimaldi' },
    { id:'musee-picasso-vallauris', title:'Musée National Picasso - Vallauris', city:'Vallauris', category:'culture', price:10, rating:4.5, reviews:432, lat:43.577, lng:7.055, image:'https://images.unsplash.com/photo-1519681393784-d120267933ba', tags:['culture','musée','picasso'], popularity:0.79, addedAt:'2025-03-10', description:'Céramiques et œuvres de Picasso à Vallauris' },
    { id:'fondation-maeght', title:'Fondation Maeght', city:'Saint-Paul-de-Vence', category:'culture', price:16, rating:4.9, reviews:1234, lat:43.694, lng:7.122, image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', tags:['culture','art','fondation'], popularity:0.96, addedAt:'2025-01-20', description:'Fondation d\'art moderne et contemporain' },
    { id:'musee-parfumerie', title:'Musée International de la Parfumerie', city:'Grasse', category:'culture', price:8, rating:4.4, reviews:567, lat:43.658, lng:6.922, image:'https://images.unsplash.com/photo-1520975922322-54b0da4c6caf', tags:['culture','musée','parfum'], popularity:0.85, addedAt:'2025-02-15', description:'Histoire et techniques de la parfumerie' },
    { id:'pass-musees-nice', title:'Pass 4 jours - Musées de Nice', city:'Nice', category:'culture', price:20, rating:4.7, reviews:1456, lat:43.695, lng:7.275, image:'https://images.unsplash.com/photo-1519681393784-d120267933ba', tags:['culture','pass','musées'], popularity:0.92, addedAt:'2025-01-05', description:'Accès à tous les musées municipaux de Nice pendant 4 jours' },
    
    // VILLAS & SITES REMARQUABLES
    { id:'villa-ephrussi', title:'Villa Ephrussi de Rothschild', city:'Saint-Jean-Cap-Ferrat', category:'culture', price:17, rating:4.9, reviews:2134, lat:43.690, lng:7.330, image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', tags:['culture','villa','jardins'], popularity:0.97, addedAt:'2025-01-08', description:'Villa rose et ses 9 jardins thématiques' },
    { id:'villa-kerylos', title:'Villa Kérylos', city:'Beaulieu-sur-Mer', category:'culture', price:14, rating:4.8, reviews:987, lat:43.705, lng:7.330, image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', tags:['culture','villa','grèce'], popularity:0.93, addedAt:'2025-01-12', description:'Villa grecque antique reconstituée' },
    { id:'fort-carre', title:'Fort Carré d\'Antibes', city:'Antibes', category:'culture', price:6, rating:4.3, reviews:432, lat:43.580, lng:7.123, image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', tags:['culture','fort','histoire'], popularity:0.76, addedAt:'2025-03-20', description:'Fort militaire du XVIe siècle avec vue panoramique' },
    { id:'citadelle-villefranche', title:'Citadelle de Villefranche', city:'Villefranche-sur-Mer', category:'culture', price:5, rating:4.2, reviews:321, lat:43.705, lng:7.310, image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', tags:['culture','citadelle','musées'], popularity:0.71, addedAt:'2025-04-10', description:'Citadelle abritant plusieurs musées' },
    { id:'musee-oceanographique', title:'Musée Océanographique de Monaco', city:'Monaco', category:'culture', price:19, rating:4.8, reviews:3456, lat:43.731, lng:7.428, image:'https://images.unsplash.com/photo-1519681393784-d120267933ba', tags:['culture','musée','océan'], popularity:0.95, addedAt:'2025-01-18', description:'Aquarium et musée océanographique' },
    { id:'phoenix-nice', title:'Parc Phoenix', city:'Nice', category:'nature', price:5, rating:4.4, reviews:1234, lat:43.660, lng:7.210, image:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429', tags:['nature','parc','famille'], popularity:0.82, addedAt:'2025-02-20', description:'Parc floral et zoologique' },
    
    // PARFUMERIES & ATELIERS
    { id:'grasse-perfume', title:'Atelier parfumerie à Grasse', city:'Grasse', category:'atelier', price:55, rating:4.9, reviews:421, lat:43.658, lng:6.922, image:'https://images.unsplash.com/photo-1520975922322-54b0da4c6caf', tags:['atelier','parfum'], popularity:0.95, addedAt:'2025-06-25', description:'Création de votre parfum personnalisé' },
    { id:'fragonard-visite', title:'Fragonard - Visite gratuite', city:'Grasse', category:'atelier', price:0, rating:4.6, reviews:2345, lat:43.658, lng:6.922, image:'https://images.unsplash.com/photo-1520975922322-54b0da4c6caf', tags:['atelier','parfum','gratuit'], popularity:0.91, addedAt:'2025-01-25', description:'Visite guidée gratuite de la parfumerie' },
    { id:'molinard-atelier', title:'Molinard - Atelier création', city:'Grasse', category:'atelier', price:65, rating:4.8, reviews:567, lat:43.658, lng:6.922, image:'https://images.unsplash.com/photo-1520975922322-54b0da4c6caf', tags:['atelier','parfum'], popularity:0.89, addedAt:'2025-03-15', description:'Atelier de création de parfum' },
    { id:'galimard-atelier', title:'Galimard - Atelier création', city:'Grasse', category:'atelier', price:60, rating:4.7, reviews:432, lat:43.658, lng:6.922, image:'https://images.unsplash.com/photo-1520975922322-54b0da4c6caf', tags:['atelier','parfum'], popularity:0.87, addedAt:'2025-04-05', description:'Création de votre parfum avec parfumeur' },
    
    // MONTAGNE & NATURE
    { id:'eze-village', title:'Village perché d\'Èze + jardin exotique', city:'Èze', category:'nature', price:15, rating:4.9, reviews:423, lat:43.728, lng:7.362, image:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', tags:['nature','village','panorama'], popularity:0.94, addedAt:'2025-06-01', description:'Village médiéval et jardin exotique' },
    { id:'menton-lemons', title:'Menton : jardins & citronnade', city:'Menton', category:'nature', price:9, rating:4.4, reviews:84, lat:43.774, lng:7.497, image:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429', tags:['nature','détente'], popularity:0.5, addedAt:'2025-05-28', description:'Jardins botaniques et dégustation' },
    { id:'mercantour', title:'Parc National du Mercantour - Randonnée', city:'Saint-Martin-Vésubie', category:'nature', price:25, rating:4.8, reviews:678, lat:44.070, lng:7.250, image:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429', tags:['nature','randonnée','montagne'], popularity:0.86, addedAt:'2025-05-10', description:'Randonnée guidée dans le parc national' },
    { id:'parc-alpha', title:'Parc Alpha - Loups', city:'Saint-Martin-Vésubie', category:'nature', price:18, rating:4.7, reviews:456, lat:44.070, lng:7.250, image:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429', tags:['nature','loups','famille'], popularity:0.81, addedAt:'2025-06-15', description:'Observation des loups dans leur habitat naturel' },
    { id:'gorges-loup', title:'Gorges du Loup - Canyoning', city:'Tourrettes-sur-Loup', category:'nature', price:75, rating:4.6, reviews:234, lat:43.787, lng:7.060, image:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429', tags:['nature','canyoning','sport'], popularity:0.78, addedAt:'2025-05-20', description:'Descente en canyoning des gorges' },
    { id:'colmiane-tyrolienne', title:'La Colmiane - Tyrolienne géante', city:'La Colmiane', category:'nature', price:35, rating:4.5, reviews:345, lat:44.080, lng:7.380, image:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429', tags:['nature','tyrolienne','sport'], popularity:0.79, addedAt:'2025-06-10', description:'Tyrolienne géante en montagne' },
    { id:'isola-2000', title:'Isola 2000 - Activités été', city:'Isola 2000', category:'nature', price:45, rating:4.4, reviews:567, lat:44.180, lng:7.150, image:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429', tags:['nature','montagne','été'], popularity:0.83, addedAt:'2025-07-01', description:'Activités de montagne en été' },
    { id:'auron', title:'Auron - Activités été', city:'Auron', category:'nature', price:40, rating:4.3, reviews:432, lat:44.220, lng:6.920, image:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429', tags:['nature','montagne','été'], popularity:0.77, addedAt:'2025-07-05', description:'Randonnées et activités en montagne' },
    
    // GASTRONOMIE & OENOTOURISME
    { id:'cannes-cooking', title:'Atelier cuisine méditerranéenne', city:'Cannes', category:'atelier', price:75, rating:4.8, reviews:198, lat:43.552, lng:7.017, image:'https://images.unsplash.com/photo-1556910103-1c02745aae4d', tags:['atelier','gastronomie'], popularity:0.82, addedAt:'2025-06-10', description:'Cours de cuisine niçoise et méditerranéenne' },
    { id:'nice-cooking', title:'Atelier cuisine niçoise', city:'Nice', category:'atelier', price:70, rating:4.7, reviews:234, lat:43.695, lng:7.265, image:'https://images.unsplash.com/photo-1556910103-1c02745aae4d', tags:['atelier','gastronomie','niçois'], popularity:0.84, addedAt:'2025-05-15', description:'Apprenez les recettes traditionnelles niçoises' },
    { id:'degustation-bellet', title:'Dégustation vignoble Bellet', city:'Nice', category:'atelier', price:25, rating:4.6, reviews:345, lat:43.695, lng:7.265, image:'https://images.unsplash.com/photo-1556910103-1c02745aae4d', tags:['atelier','vin','dégustation'], popularity:0.80, addedAt:'2025-06-20', description:'Dégustation des vins AOC Bellet' },
    
    // VISITES URBAINES
    { id:'hop-on-hop-off-nice', title:'Nice Le Grand Tour - Bus Hop On Hop Off', city:'Nice', category:'culture', price:22, rating:4.5, reviews:1234, lat:43.695, lng:7.265, image:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', tags:['culture','bus','visite'], popularity:0.88, addedAt:'2025-02-10', description:'Bus à arrêts multiples - 1 ou 2 jours' },
    { id:'train-touristique-nice', title:'Train touristique Nice', city:'Nice', category:'culture', price:12, rating:4.3, reviews:567, lat:43.695, lng:7.265, image:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', tags:['culture','train','visite'], popularity:0.75, addedAt:'2025-03-15', description:'Visite commentée en petit train' },
    { id:'train-touristique-cannes', title:'Train touristique Cannes', city:'Cannes', category:'culture', price:12, rating:4.4, reviews:432, lat:43.552, lng:7.017, image:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', tags:['culture','train','visite'], popularity:0.76, addedAt:'2025-03-20', description:'Découverte de Cannes en petit train' },
    
    // AUTRES
    { id:'antibes-oldtown', title:'Visite guidée Vieil Antibes + Picasso', city:'Antibes', category:'culture', price:18, rating:4.7, reviews:96, lat:43.580, lng:7.123, image:'https://images.unsplash.com/photo-1519681393784-d120267933ba', tags:['culture','musée'], popularity:0.68, addedAt:'2025-04-18', description:'Visite guidée du vieil Antibes' },
    { id:'saintpaul-art', title:'Saint-Paul-de-Vence : ruelles & galeries', city:'Saint-Paul-de-Vence', category:'culture', price:12, rating:4.5, reviews:140, lat:43.694, lng:7.122, image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', tags:['art','village'], popularity:0.6, addedAt:'2025-03-05', description:'Découverte du village d\'artistes' },
    { id:'monaco-casino', title:'Visite du Casino de Monte-Carlo', city:'Monaco', category:'culture', price:25, rating:4.6, reviews:567, lat:43.738, lng:7.428, image:'https://images.unsplash.com/photo-1566073771259-6a8506099945', tags:['culture','luxe','casino'], popularity:0.91, addedAt:'2025-05-20', description:'Visite guidée du célèbre casino' }
  ],
  hotels: [
    { id:'nice-negresco', name:'Hôtel Negresco', city:'Nice', stars:5, price:350, rating:4.8, reviews:2847, lat:43.695, lng:7.265, image:'https://images.unsplash.com/photo-1566073771259-6a8506099945', amenities:['spa','restaurant','plage','parking'], popularity:0.96, addedAt:'2025-01-15', login:'negresco', password:'demo123' },
    { id:'cannes-martinez', name:'Grand Hôtel Martinez', city:'Cannes', stars:5, price:420, rating:4.7, reviews:1923, lat:43.552, lng:7.017, image:'https://images.unsplash.com/photo-1611892440504-42a792e24d32', amenities:['spa','restaurant','plage','piscine'], popularity:0.93, addedAt:'2025-02-10', login:'martinez', password:'demo123' },
    { id:'antibes-juan', name:'Hôtel Belles Rives', city:'Antibes', stars:4, price:280, rating:4.6, reviews:1456, lat:43.580, lng:7.123, image:'https://images.unsplash.com/photo-1564501049412-61c2a3083791', amenities:['restaurant','plage','bar'], popularity:0.85, addedAt:'2025-03-05', login:'bellesrives', password:'demo123' },
    { id:'monaco-hermitage', name:'Hôtel Hermitage Monte-Carlo', city:'Monaco', stars:5, price:550, rating:4.9, reviews:3214, lat:43.738, lng:7.428, image:'https://images.unsplash.com/photo-1564501049412-61c2a3083791', amenities:['spa','restaurant','casino','piscine'], popularity:0.98, addedAt:'2025-01-20', login:'hermitage', password:'demo123' },
    { id:'nice-hyatt', name:'Hyatt Regency Nice Palais de la Méditerranée', city:'Nice', stars:5, price:320, rating:4.5, reviews:1876, lat:43.695, lng:7.265, image:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b', amenities:['spa','restaurant','piscine','fitness'], popularity:0.87, addedAt:'2025-04-12', login:'hyatt', password:'demo123' },
    { id:'cannes-carlton', name:'Carlton Cannes', city:'Cannes', stars:5, price:380, rating:4.7, reviews:2134, lat:43.552, lng:7.017, image:'https://images.unsplash.com/photo-1566073771259-6a8506099945', amenities:['spa','restaurant','plage','casino'], popularity:0.92, addedAt:'2025-02-28', login:'carlton', password:'demo123' },
    { id:'menton-royal', name:'Hôtel Royal Westminster', city:'Menton', stars:4, price:180, rating:4.4, reviews:892, lat:43.774, lng:7.497, image:'https://images.unsplash.com/photo-1611892440504-42a792e24d24', amenities:['restaurant','plage','bar'], popularity:0.72, addedAt:'2025-05-15', login:'westminster', password:'demo123' },
    { id:'grasse-bastide', name:'Bastide Saint-Antoine', city:'Grasse', stars:4, price:220, rating:4.6, reviews:654, lat:43.658, lng:6.922, image:'https://images.unsplash.com/photo-1564501049412-61c2a3083791', amenities:['restaurant','spa','jardin'], popularity:0.78, addedAt:'2025-04-20', login:'bastide', password:'demo123' },
    { id:'saintpaul-colombe', name:'La Colombe d\'Or', city:'Saint-Paul-de-Vence', stars:4, price:250, rating:4.8, reviews:1234, lat:43.694, lng:7.122, image:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b', amenities:['restaurant','art','jardin'], popularity:0.89, addedAt:'2025-03-18', login:'colombe', password:'demo123' },
    { id:'nice-meridien', name:'Le Méridien Nice', city:'Nice', stars:4, price:200, rating:4.3, reviews:1567, lat:43.695, lng:7.265, image:'https://images.unsplash.com/photo-1611892440504-42a792e24d24', amenities:['restaurant','piscine','fitness'], popularity:0.81, addedAt:'2025-05-05', login:'meridien', password:'demo123' }
  ],
  bookings: [],
  promoCodes: [
    { code:'ETE2025', discount:10, type:'percent', validUntil:'2025-09-30', description:'10% de réduction été 2025' },
    { code:'HOTEL20', discount:20, type:'percent', validUntil:'2025-12-31', description:'20% de réduction pour hôtels partenaires' },
    { code:'FAMILLE15', discount:15, type:'percent', validUntil:'2025-08-31', description:'15% de réduction famille' }
  ],
  users: [
    { id:'U001', email:'testeuse@sudora.fr', password:'test123', name:'Testeuse Sudora', phone:'06 12 34 56 78', createdAt:'2025-01-01T00:00:00.000Z' }
  ]
}

const db = ensure(seed)

export function listActivities({q='', city='', category='', sort='smart'}={}){
  let items = read().activities || []
  const term = q.trim().toLowerCase()
  if(term){ items = items.filter(a => (a.title+' '+a.city+' '+a.tags.join(' ')).toLowerCase().includes(term)) }
  if(city){ items = items.filter(a => a.city.toLowerCase().includes(city.toLowerCase())) }
  if(category){ items = items.filter(a => a.category === category) }
  const now = Date.now()
  items = items.map(a=>{
    const freshness = 1 - Math.min(1, (now - new Date(a.addedAt).getTime())/(1000*60*60*24*120))
    const reviewFactor = Math.min(1, a.reviews/400) * (a.rating/5)
    let score = 0.5*a.popularity + 0.3*reviewFactor + 0.2*freshness
    if(term){ score += 0.05 }
    return {...a, _score:score, type:'activity'}
  })
  if(sort==='price-asc'){ items.sort((a,b)=>a.price-b.price) }
  else if(sort==='price-desc'){ items.sort((a,b)=>b.price-a.price) }
  else if(sort==='rating'){ items.sort((a,b)=>b.rating-a.rating) }
  else { items.sort((a,b)=>b._score-a._score) }
  return items
}

export function listHotels({q='', city='', stars='', sort='smart'}={}){
  let items = read().hotels || []
  const term = q.trim().toLowerCase()
  if(term){ items = items.filter(h => (h.name+' '+h.city+' '+h.amenities.join(' ')).toLowerCase().includes(term)) }
  if(city){ items = items.filter(h => h.city.toLowerCase().includes(city.toLowerCase())) }
  if(stars){ items = items.filter(h => h.stars === parseInt(stars)) }
  const now = Date.now()
  items = items.map(h=>{
    const freshness = 1 - Math.min(1, (now - new Date(h.addedAt).getTime())/(1000*60*60*24*120))
    const reviewFactor = Math.min(1, h.reviews/3000) * (h.rating/5)
    let score = 0.5*h.popularity + 0.3*reviewFactor + 0.2*freshness
    if(term){ score += 0.05 }
    return {...h, _score:score, type:'hotel'}
  })
  if(sort==='price-asc'){ items.sort((a,b)=>a.price-b.price) }
  else if(sort==='price-desc'){ items.sort((a,b)=>b.price-a.price) }
  else if(sort==='rating'){ items.sort((a,b)=>b.rating-a.rating) }
  else { items.sort((a,b)=>b._score-a._score) }
  return items
}

export function searchAll({q='', city='', category='', stars='', sort='smart'}={}){
  const activities = listActivities({q, city, category, sort})
  const hotels = listHotels({q, city, stars, sort})
  let all = [...activities, ...hotels]
  if(sort==='price-asc'){ all.sort((a,b)=>a.price-b.price) }
  else if(sort==='price-desc'){ all.sort((a,b)=>b.price-a.price) }
  else if(sort==='rating'){ all.sort((a,b)=>b.rating-a.rating) }
  else { all.sort((a,b)=>b._score-a._score) }
  return all
}

export function getActivity(id){
  return (read().activities||[]).find(a=>a.id===id)
}

export function getHotel(id){
  return (read().hotels||[]).find(h=>h.id===id)
}

export function loginHotel(login, password){
  const hotel = (read().hotels||[]).find(h=>h.login===login && h.password===password)
  return hotel ? {id:hotel.id, name:hotel.name, city:hotel.city} : null
}

export function createBooking({activityId, hotelId, guestName, guestEmail, quantity, date, promoCode}){
  const activity = getActivity(activityId)
  if(!activity) return null
  
  const promo = promoCode ? (read().promoCodes||[]).find(p=>p.code===promoCode && new Date(p.validUntil) > new Date()) : null
  const discount = promo ? (promo.type==='percent' ? activity.price * promo.discount / 100 : promo.discount) : 0
  const total = (activity.price - discount) * quantity
  const commission = total * 0.05 // 5% commission pour l'hôtel
  
  const booking = {
    id: 'BK'+Date.now(),
    activityId,
    activityTitle: activity.title,
    hotelId,
    guestName,
    guestEmail,
    quantity,
    date,
    price: activity.price,
    discount,
    total,
    commission,
    promoCode: promoCode || null,
    status: 'confirmed',
    qrCode: 'QR'+Date.now()+Math.random().toString(36).substr(2,9),
    createdAt: new Date().toISOString()
  }
  
  const db = read()
  db.bookings = db.bookings || []
  db.bookings.push(booking)
  write(db)
  
  return booking
}

export function getBookingsByHotel(hotelId){
  return (read().bookings||[]).filter(b=>b.hotelId===hotelId)
}

export function getBookingsByGuest(email){
  return (read().bookings||[]).filter(b=>b.guestEmail===email)
}

export function getBooking(id){
  return (read().bookings||[]).find(b=>b.id===id)
}

export function validatePromoCode(code){
  const promo = (read().promoCodes||[]).find(p=>p.code===code && new Date(p.validUntil) > new Date())
  return promo || null
}

// Authentification utilisateur
export function registerUser(email, password, name, phone){
  const db = read()
  if(!db.users){ db.users = [] }
  
  // Vérifier si l'utilisateur existe déjà
  if(db.users.find(u => u.email === email)){
    return { success: false, error: 'Cet email est déjà utilisé' }
  }
  
  const user = {
    id: 'U' + Date.now(),
    email,
    password, // En production, il faudrait hasher le mot de passe
    name,
    phone,
    createdAt: new Date().toISOString()
  }
  
  db.users.push(user)
  write(db)
  
  return { success: true, user: { id: user.id, email: user.email, name: user.name, phone: user.phone } }
}

export function loginUser(email, password){
  const db = read()
  const users = db.users || []
  const user = users.find(u => u.email === email && u.password === password)
  
  if(user){
    return { success: true, user: { id: user.id, email: user.email, name: user.name, phone: user.phone } }
  }
  
  return { success: false, error: 'Email ou mot de passe incorrect' }
}

export function getCurrentUser(){
  try {
    return JSON.parse(localStorage.getItem('sudora_user') || 'null')
  } catch {
    return null
  }
}
