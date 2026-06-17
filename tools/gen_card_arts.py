import json, requests, time, os, shutil

COMFYUI = "http://127.0.0.1:8189"
OUTPUT_DIR = r"C:\ComfyUI\output"
ASSETS_DIR = r"C:\Users\blade\ArcanaEternal\assets"

def generate_image(prompt, filename, seed=None, w=768, h=1024, steps=30, cfg=7.5):
    workflow = {
        "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": "Juggernaut-X-RunDiffusion-NSFW.safetensors"}},
        "2": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["1", 1], "text": prompt}},
        "3": {"class_type": "CLIPTextEncode", "inputs": {"clip": ["1", 1], "text": "blurry, low quality, distorted, ugly, deformed, watermark, text, signature, cropped, worst quality"}},
        "4": {"class_type": "EmptyLatentImage", "inputs": {"width": w, "height": h, "batch_size": 1}},
        "5": {"class_type": "KSampler", "inputs": {"model": ["1", 0], "positive": ["2", 0], "negative": ["3", 0], "latent_image": ["4", 0], "seed": seed or 42, "steps": steps, "cfg": cfg, "sampler_name": "euler_ancestral", "scheduler": "karras", "denoise": 1.0}},
        "6": {"class_type": "VAEDecode", "inputs": {"samples": ["5", 0], "vae": ["1", 2]}},
        "7": {"class_type": "SaveImage", "inputs": {"filename_prefix": filename, "images": ["6", 0]}}
    }
    
    resp = requests.post(f"{COMFYUI}/prompt", json={"prompt": workflow}, timeout=30)
    resp.raise_for_status()
    prompt_id = resp.json().get("prompt_id")
    print(f"  [Q] {filename} -> {prompt_id[:8]}...")
    
    for i in range(120):
        time.sleep(2)
        h_resp = requests.get(f"{COMFYUI}/history/{prompt_id}", timeout=10)
        if h_resp.status_code == 200:
            hd = h_resp.json()
            if prompt_id in hd:
                for nid, out in hd[prompt_id].get("outputs", {}).items():
                    if "images" in out:
                        for img in out["images"]:
                            src = os.path.join(OUTPUT_DIR, img.get("subfolder", ""), img.get("filename", ""))
                            if os.path.exists(src):
                                print(f"  [OK] {filename}")
                                return src
                break
    print(f"  [FAIL] {filename}")
    return None

# Generate elemental card arts
print("=" * 50)
print("GENERATING ELEMENTAL CARD ARTS")
print("=" * 50)

cards = [
    # Fire element
    ("epic fantasy illustration of a massive fireball exploding, orange and red flames, heat waves, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_fire_01", 2001),
    ("epic fantasy illustration of a phoenix rising from flames, orange and gold feathers, fire wings spread, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_fire_02", 2002),
    ("epic fantasy illustration of a fire dragon breathing flames, red and orange scales, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_fire_03", 2003),
    # Ice element
    ("epic fantasy illustration of ice shards flying through the air, crystalline blue ice, freezing mist, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_ice_01", 2011),
    ("epic fantasy illustration of a frozen castle, ice crystals, blue and white, aurora borealis, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_ice_02", 2012),
    ("epic fantasy illustration of an ice golem, crystalline blue body, frost aura, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_ice_03", 2013),
    # Lightning element
    ("epic fantasy illustration of lightning bolts striking from storm clouds, electric blue energy, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_lightning_01", 2021),
    ("epic fantasy illustration of a thunder god, electric blue aura, lightning spear, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_lightning_02", 2022),
    # Earth element
    ("epic fantasy illustration of a massive stone golem emerging from the earth, rocks and crystals, brown and green, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_earth_01", 2031),
    ("epic fantasy illustration of a treant, ancient tree creature, roots and branches, green and brown, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_earth_02", 2032),
    # Wind element
    ("epic fantasy illustration of a tornado, swirling wind, debris flying, blue and white, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_wind_01", 2041),
    ("epic fantasy illustration of a harpy flying, wind feathers, blue and white, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_wind_02", 2042),
    # Holy element
    ("epic fantasy illustration of holy light descending from the sky, golden rays, angelic wings, white and gold, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_holy_01", 2051),
    ("epic fantasy illustration of a white mage casting a spell, white and gold robes, glowing staff, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_holy_02", 2052),
    # Dark element
    ("epic fantasy illustration of dark energy swirling, purple and black, shadow creatures, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_dark_01", 2061),
    ("epic fantasy illustration of a dark knight, black armor, cursed sword, purple aura, dark background, Final Fantasy style, card art, no text, no border, high quality, 4k", "card_dark_02", 2062),
]

for prompt, fname, seed in cards:
    print(f"\nGenerating: {fname}")
    result = generate_image(prompt, fname, seed=seed, w=768, h=1024, steps=30, cfg=7.5)
    if result:
        dst = os.path.join(ASSETS_DIR, "cards", f"{fname}.png")
        shutil.copy2(result, dst)
        print(f"  -> Copied to {dst}")

print("\nDone!")
