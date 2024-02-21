# Lost Horizon

---

## Asset - key element of the database

Each Asset has:

- Nomenclature
- Part Number
- Cost
- Quantity
- Unit of inventory
- Total Value (computed)
- Barcode - Part Number
- Barcode - Location
- 1574 Printed
- Bin Label Printed
- DOLI (?)
- Flag to determine if it is stored or deployed
- End of life date
- Deployed? Yes/No
- Location
  - When in inventory
    - Building
    - Stockroom
    - Shelf
    - Level
    - Location on Shelf
    - Layer
  - When in use
    - Building
    - Room
    - Desk

### Asset endpoints

- GET All Assets - `/api/v1/assets`
- POST One Asset - `/api/v1/assets`

- GET One Asset - `/api/v1/assets/:id`
- PATCH One Asset - `/api/v1/assets/:id`
- DEL One Asset - `/api/v1/assets/:id`

### Location endpoints

- GET All Locations - /api/v1/locations/

- `warehouse`

  - `stockroom`
    - `shelf`
      - `shelfLevel`
        - `shelfLocation`
          - `shelfLayer`

- `Building`
  - `Room`
    - `Desk`

<!-- ### Warehouse management endpoints

- GET All Warehouse - /api/v1/warehouses
- POST One Warehouse - /api/v1/warehouses

- GET One Warehouse - /api/v1/warehouses/:id
- PATCH One Warehouse - /api/v1/warehouses/:id
- DEL One Warehouse - /api/v1/warehouses/:id - restrict this to one person only

### Stockroom management endpoints

- GET All Stockroom - /api/v1/stockrooms
- POST One Stockroom - /api/v1/stockrooms

- GET One Stockroom - /api/v1/stockrooms/:id
- PATCH One Stockroom - /api/v1/stockrooms/:id
- DEL One Stockroom - /api/v1/stockrooms/:id - restrict this to one person only

### Shelf management endpoints

- GET All Shelves - /api/v1/shelves
- POST One Shelf - /api/v1/shelves

- GET One Shelf - /api/v1/shelves/:id
- PATCH One Shelf - /api/v1/shelves/:id
- DEL One Shelf - /api/v1/shelves/:id -->

### Query endpoints

- Get details of a given storage location
- `/api/v1/query/:warehouseId/:stockroomId?/:shelfId?/:shelfLevelId?`
