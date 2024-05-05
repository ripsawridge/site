import json
import gspread

sheet_url = "https://docs.google.com/spreadsheets/d/1bQNpRoHbgULGLXn68sTGm5v1HsbAepRQSuMVjVewaaQ/edit#gid=0"

gc = gspread.service_account("./client_secret.json")

def getOrCreateWorksheet(sheet, name, minRows, minColumns):
  try:
    db = sheet.worksheet(name)
  except gspread.exceptions.WorksheetNotFound:
    sheet.add_worksheet(name, minRows, minColumns)
    db = sheet.worksheet(name)

  return db

def load_locations(filename):
  locations = {}
  with open(filename,"r") as read_file:
    data = json.load(read_file)

    # strip the region information.
    for r in data:
      for l in r.get("locations"):
        locations[l.get("name")] = l.get("location")
  return locations

def update_database(data, sheet):
  wks = sheet.worksheet("Trips")

  # Make the data columns
  wks.update([ ["url", "date", "title", "elevation"] ], "A1")

  # Format the header
  wks.format('A1:D1', {'textFormat': {'bold': True}})

  # data should be an array of items.
  dtow = []
  for d in data:
    r = []
    r.append(d.get("url"))
    r.append(d.get("date"))
    r.append(d.get("title"))
    elevation_array = d.get("elevation")
    if len(elevation_array) > 0:
      evalue = "=" + "+".join([str(j) for j in elevation_array])
    else:
      evalue = "=0"
    r.append(evalue)
    dtow.append(r)

  # Update a range of cells using the top left corner address
  wks.resize(len(dtow) + 1, 10)
  wks.update(dtow, "A2", raw=False)

  # end formatting
  wks.columns_auto_resize(0, 4)

def update_locations(data, locationsdb, sheet):
  wks = sheet.worksheet("Locations")

  # Make the data columns
  wks.update([ ["location", "lat", "long"] ], "A1")

  # Format the header
  wks.format('A1:C1', {'textFormat': {'bold': True}})

  locations = {}
  db_row_count = 0
  locations_sorted = []
  for d in data:
    for l in d.get("location"):
      db_row_count += 1
      if locations.get(l) == None:
        locations[l] = True
        locations_sorted.append(l)

  dtos = []
  for l in range(0, len(locations_sorted)):
    key = locations_sorted[l]
    ll = locationsdb.get(key)
    if ll == None:
      lat = ""
      long = ""
    else:
      lat = ll[0]
      long = ll[1]
    dtos.append([locations_sorted[l], lat, long])

  wks.resize(len(locations_sorted) + 2, 3)
  wks.update(dtos, "A2")
  wks.columns_auto_resize(0, 1)

  # Now create the lookup table between trips and locations.
  db = getOrCreateWorksheet(sheet, "Trips_Locations", 1, 2)

  db.update([["url", "location"]], "A1")

  # Format the header
  db.format('A1:B1', {'textFormat': {'bold': True}})
  dtos = []

  for d in data:
    for l in d.get("location"):
      t = [d.get("url"), l]
      dtos.append(t)

  db.resize(db_row_count + 1, 2)
  db.update(dtos, "A2")
  db.columns_auto_resize(0, 2)

def update_friends(data, sheet):
  friends = getOrCreateWorksheet(sheet, "Friends", 1, 1)
  friends.update([["name"]], "A1")
  # Format the header
  friends.format('A1:B1', {'textFormat': {'bold': True}})

  friendsdb = {}
  db_row_count = 0
  friends_sorted = []
  for d in data:
    for l in d.get("guests"):
      db_row_count += 1
      if friendsdb.get(l) == None:
        friendsdb[l] = True
        friends_sorted.append([l])

  friends.resize(len(friends_sorted) + 2, 1)
  friends.update(friends_sorted, "A2")
  friends.columns_auto_resize(0, 1)

  # Now create the lookup table between trips and friends.
  db = getOrCreateWorksheet(sheet, "Trips_Friends", 1, 2)

  db.update([["url", "friend"]], "A1")

  # Format the header
  db.format('A1:B1', {'textFormat': {'bold': True}})
  dtos = []

  for d in data:
    for l in d.get("guests"):
      t = [d.get("url"), l]
      dtos.append(t)

  db.resize(db_row_count + 1, 2)
  db.update(dtos, "A2")
  db.columns_auto_resize(0, 2)

def update_route_pitches(sheet, routesdb):
  pitches = getOrCreateWorksheet(sheet, "Routes_Pitches", 1, 4)
  pitches.update([["id", "pitch number", "rating system", "rating"]], "A1")
  # Format the header
  pitches.format('A1:D1', {'textFormat': {'bold': True}})

  routeid = 0
  pitches_sorted = []
  for i in range(0, len(routesdb)):
    route = routesdb.get(i)
    rating_system = route.get("RatingSystem")
    pitch_array = route.get("pitches")
    for j in range(0, len(pitch_array)):
      pitches_sorted.append([routeid, j, rating_system, pitch_array[j]])
    routeid += 1

  pitches.resize(len(pitches_sorted) + 1, 4)
  pitches.update(pitches_sorted, "A2")
  pitches.columns_auto_resize(0, 4)

def update_routes(data, sheet):
  routes = getOrCreateWorksheet(sheet, "Routes", 1, 5)
  routes.update([["id", "url", "number", "name", "rating system"]], "A1")
  # Format the header
  routes.format('A1:E1', {'textFormat': {'bold': True}})

  routesdb = {}
  db_row_count = 0
  routes_sorted = []
  for d in data:
    for l in d.get("routes"):
      routes_sorted.append([db_row_count, d.get("url"), l.get("number"), l.get("Name"), l.get("RatingSystem")])
      routesdb[db_row_count] = l
      db_row_count += 1

  routes.resize(len(routes_sorted) + 1, 4)
  routes.update(routes_sorted, "A2")
  routes.columns_auto_resize(0, 4)

  update_route_pitches(sheet, routesdb)

def process_data(data, sheet):
  locations = {}
  update_database(data, sheet)
  locations = load_locations('../data/locations.json')
  update_locations(data, locations, sheet)
  update_routes(data, sheet)
  update_friends(data, sheet)


def main():
  locations = load_locations('../data/locations.json')

  sheet = gc.open_by_url(sheet_url)
  with open("../_site/database.json","r") as read_file:
    data = json.load(read_file)
    process_data(data, sheet)


# For locations
# =IFNA(JOIN(",",FILTER(Trips_Locations!B:B, Trips_Locations!A:A=A475)),"")

if __name__ == '__main__':
  main()
