#!/usr/bin/env python3
"""언더테일 스프라이트 시트를 19개 셀로 잘라 images/undertale-01.png ~ 19.png 로 저장."""
import os
from pathlib import Path

from PIL import Image

# 원본 (Cursor assets 경로 또는 프로젝트 내 복사본)
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
IMAGES_DIR = PROJECT_ROOT / "images"
SOURCE = (
    PROJECT_ROOT / "images" / "undertale-sheet.png"
    or Path(r"C:/Users/joygr/.cursor/projects/d-workspace-algorithm-lect-algorithm-lect/assets/"
            r"c__Users_joygr_AppData_Roaming_Cursor_User_workspaceStorage_2c922e8a144bb4f666291c64aabe48f8_images_"
            r"17e0533ddb5140718-3a249ea0-d33e-433a-bd2b-fd342a5f3e74.png")
)

def main():
    # 프로젝트 images에 시트가 없으면 Cursor assets 경로 사용
    sheet_path = IMAGES_DIR / "undertale-sheet.png"
    if not sheet_path.exists():
        sheet_path = Path(
            r"C:/Users/joygr/.cursor/projects/d-workspace-algorithm-lect-algorithm-lect/assets/"
            r"c__Users_joygr_AppData_Roaming_Cursor_User_workspaceStorage_2c922e8a144bb4f666291c64aabe48f8_images_"
            r"17e0533ddb5140718-3a249ea0-d33e-433a-bd2b-fd342a5f3e74.png"
        )
    if not sheet_path.exists():
        print("원본 이미지를 찾을 수 없습니다. images/undertale-sheet.png 로 복사해 주세요.")
        return 1

    im = Image.open(sheet_path).convert("RGBA")
    w, h = im.size
    # 5열 x 4행 = 20칸, 19개 사용
    ncols, nrows = 5, 4
    cw = w // ncols
    rh = h // nrows

    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    for i in range(19):
        col = i % ncols
        row = i // ncols
        left = col * cw
        top = row * rh
        right = w if col == ncols - 1 else (col + 1) * cw
        bottom = h if row == nrows - 1 else (row + 1) * rh
        cell = im.crop((left, top, right, bottom))
        out = IMAGES_DIR / f"undertale-{i+1:02d}.png"
        cell.save(out, "PNG")
        print(out.name)
    print("Done. 19 files saved to", IMAGES_DIR)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
