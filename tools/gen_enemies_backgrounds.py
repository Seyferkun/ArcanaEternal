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
print("GENERATING ENEMY SPRITES")
print("=" * 50)

enemies = [
    # More variety
    ("fantasy goblin warrior, green skin, crude armor, rusty sword, menacing grin, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_goblin_warrior", 3001),
    ("fantasy skeleton knight, bone armor, glowing blue eyes, sword and shield, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_skeleton_knight", 3002),
    ("fantasy slime king, large blue translucent blob, crown, cute but dangerous, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_slime_king", 3003),
    ("fantasy wolf beast, grey fur, glowing red eyes, feral pose, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_wolf_beast", 3004),
    ("fantasy dark mage, black robes, glowing purple staff, sinister expression, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_dark_mage", 3005),
    ("fantasy stone golem, rocky body, glowing runes, massive fists, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_stone_golem", 3006),
    ("fantasy orc berserker, green skin, massive muscles, battle axe, aggressive pose, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_orc_berserker", 3007),
    ("fantasy harpy, bird woman with colorful feathers, sharp talons, flying pose, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_harpy", 3008),
    ("fantasy ghost wraith, translucent spectral figure, glowing blue, floating, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_ghost_wraith", 3009),
    ("fantasy fire elemental, humanoid made of flames, burning body, molten rock core, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_fire_elemental", 3010),
    ("fantasy giant spider, black carapace, red eyes, dripping venom, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_giant_spider", 3011),
    ("fantasy bandit rogue, masked face, dual daggers, leather armor, sneaky pose, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_bandit_rogue", 3012),
    ("fantasy treant, ancient tree creature, wooden body, glowing green eyes, root legs, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_treant", 3013),
    ("fantasy merman warrior, blue scaled skin, trident weapon, underwater theme, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_merman_warrior", 3014),
    ("fantasy dark knight, black armor, cursed sword, glowing red eyes behind helmet, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "enemy_dark_knight", 3015),
    ("fantasy lich king, skeletal figure in dark purple robes, cursed staff, crown of bones, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "boss_lich_king", 3016),
    ("fantasy red dragon, massive scales, wings spread, breathing fire, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "boss_red_dragon", 3017),
    ("fantasy demon lord, massive horned demon, black wings, flaming greatsword, terrifying expression, full body portrait, dark background, Final Fantasy style, anime illustration, no text, high quality, 4k", "boss_demon_lord", 3018),
]

for prompt, fname, seed in enemies:
    print(f"\nGenerating: {fname}")
    result = generate_image(prompt, fname, seed=seed, w=768, h=1024, steps=25, cfg=7.5)
    if result:
        dst = os.path.join(ASSETS_DIR, "enemies", f"{fname}.png")
        shutil.copy2(result, dst)
        print(f"  -> Copied to {dst}")

print("\n" + "=" * 50)
print("GENERATING BACKGROUNDS")
print("=" * 50)

backgrounds = [
    ("fantasy forest scene, ancient trees with glowing mushrooms, mystical fog, fireflies, wide landscape, dark background, Final Fantasy style environment, no characters, high quality, 4k", "bg_forest_enhanced", 4001),
    ("fantasy desert scene, golden sand dunes, ancient ruins, scorching sun, wide landscape, dark background, Final Fantasy style environment, no characters, high quality, 4k", "bg_desert_enhanced", 4002),
    ("fantasy ice cave scene, crystalline blue ice walls, frozen stalactites, glowing aurora light, wide landscape, dark background, Final Fantasy style environment, no characters, high quality, 4k", "bg_ice_cave_enhanced", 4003),
    ("fantasy dark castle interior, gothic architecture, torches on walls, red carpet, throne room, wide landscape, dark background, Final Fantasy style environment, no characters, high quality, 4k", "bg_castle_enhanced", 4004),
    ("fantasy netherworld scene, floating rocks, lava rivers, dark sky with red clouds, wide landscape, dark background, Final Fantasy style environment, no characters, high quality, 4k", "bg_netherworld_enhanced", 4005),
]

for prompt, fname, seed in backgrounds:
    print(f"\nGenerating: {fname}")
    result = generate_image(prompt, fname, seed=seed, w=1920, h=1080, steps=25, cfg=7.5)
    if result:
        dst = os.path.join(ASSETS_DIR, "backgrounds", f"{fname}.jpg")
        shutil.copy2(result, dst)
        print(f"  -> Copied to {dst}")

print("\nDone!")
