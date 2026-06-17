import json, requests, time, os, shutil

COMFYUI = "http://127.0.0.1:8189"
OUTPUT_DIR = r"C:\ComfyUI\output"
ASSETS_DIR = r"C:\Users\blade\ArcanaEternal\assets"

def generate_image(prompt, filename, seed=None, w=768, h=1024, steps=25, cfg=7.5):
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
    
    for i in range(90):
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

print("=" * 50)
print("GENERATING MISSING CARD ARTS")
print("=" * 50)

# Cards that need unique art
cards = [
    # Elemental arts
    ("epic fantasy illustration of a massive fire explosion, orange and red flames, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_fire_01", 9001),
    ("epic fantasy illustration of a phoenix rising from golden flames, majestic wings spread, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_fire_02", 9002),
    ("epic fantasy illustration of a fire dragon breathing white-hot flames, scales glowing, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_fire_03", 9003),
    ("epic fantasy illustration of crystalline ice shards flying through freezing air, blue and white, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_ice_01", 9011),
    ("epic fantasy illustration of a frozen castle with ice crystals and aurora borealis, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_ice_02", 9012),
    ("epic fantasy illustration of an ice golem made of crystalline blue ice, frost aura, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_ice_03", 9013),
    ("epic fantasy illustration of lightning bolts striking from dark storm clouds, electric blue energy, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_lightning_01", 9021),
    ("epic fantasy illustration of a thunder god wielding a spear of lightning, electric aura, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_lightning_02", 9022),
    ("epic fantasy illustration of a massive stone golem emerging from cracked earth, rocks and crystals, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_earth_01", 9031),
    ("epic fantasy illustration of an ancient treant with glowing green eyes and root legs, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_earth_02", 9032),
    ("epic fantasy illustration of a massive tornado with debris flying, swirling wind, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_wind_01", 9041),
    ("epic fantasy illustration of a harpy with colorful feathers flying through storm clouds, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_wind_02", 9042),
    ("epic fantasy illustration of holy light descending from golden clouds, angelic wings, white and gold, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_holy_01", 9051),
    ("epic fantasy illustration of a white mage casting a healing spell, golden light, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_holy_02", 9052),
    ("epic fantasy illustration of dark swirling energy with shadow creatures, purple and black, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_dark_01", 9061),
    ("epic fantasy illustration of a dark knight with cursed sword and purple aura, dark background, Final Fantasy style card art, no text, high quality, 4k", "card_dark_02", 9062),
]

for prompt, fname, seed in cards:
    print(f"\nGenerating: {fname}")
    result = generate_image(prompt, fname, seed=seed, w=768, h=1024, steps=25, cfg=7.5)
    if result:
        dst = os.path.join(ASSETS_DIR, "cards", f"{fname}.png")
        shutil.copy2(result, dst)
        print(f"  -> Copied to {dst}")

print("\nDone!")
