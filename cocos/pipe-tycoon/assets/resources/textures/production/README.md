# Production Art

These assets are copied from the local art folders:

```text
D:\desktop\管道优化1\icon_map
D:\desktop\管道优化1\icon_terrain
D:\desktop\管道优化1\icon_equipment
```

They replace the temporary Unity-generated placeholder map, equipment, obstacle, and pipe art.

## Mapping

- `maps/map_01.png`, `maps/map_02.png`: level background maps
- `equipment/wellhead.png`: oil wellhead
- `equipment/manifold.png`: manifold
- `equipment/plem.png`: PLEM
- `pipes/pipe_standard.png`: generic pipe
- `pipes/pipe_trunkline.png`: trunkline pipe
- `pipes/pipe_flowline.png`: flowline pipe
- `terrain/style1/obstacle_*.png`: obstacle art variants used by the game
- `decorations/deco_*.png`: non-blocking background decorations, placed away from likely routes

Gameplay masks still come from level data; these images are visual skins.

Run `python tools/prepare_production_art.py` after adding new source art under `D:\desktop\管道优化1\icon_terrain\style1`, `icon_background`, or `icon_equipment`. The script copies the local source assets, removes bright checkerboard/white matte edges, crops transparent padding, and refreshes the production PNGs.
