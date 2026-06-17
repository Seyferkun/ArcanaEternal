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
print("GENERATING REMAINING CARD ARTS")
print("=" * 50)

cards = [
    # Warrior
    ("epic fantasy illustration of a warrior delivering a devastating overhead blow, shockwave impact, ground cracking, Final Fantasy style, card art, no text, high quality, 4k", "card_warrior_strike_02", 5001),
    ("epic fantasy illustration of a knight raising a glowing shield, blue energy barrier, defensive stance, Final Fantasy style, card art, no text, high quality, 4k", "card_warrior_defend_02", 5002),
    ("epic fantasy illustration of a warrior banging sword on shield, battle cry, orange energy aura, inspiring allies, Final Fantasy style, card art, no text, high quality, 4k", "card_warrior_battlecry", 5003),
    ("epic fantasy illustration of a warrior surrounded by a whirlwind of steel, multiple sword slashes, Final Fantasy style, card art, no text, high quality, 4k", "card_warrior_whirlwind", 5004),
    ("epic fantasy illustration of a glowing warrior with a massive sword, titan energy, devastating power, Final Fantasy style, card art, no text, high quality, 4k", "card_warrior_titanswrath", 5005),
    # Black Mage
    ("epic fantasy illustration of a massive meteor falling from the sky, fire and destruction, impact crater, Final Fantasy style, card art, no text, high quality, 4k", "card_blackfire_meteor", 5011),
    ("epic fantasy illustration of a massive blizzard, ice storm covering all enemies, white and blue, Final Fantasy style, card art, no text, high quality, 4k", "card_blackfire_blizzard", 5012),
    ("epic fantasy illustration of a small magical missile made of pure arcane energy, glowing purple, fast projectile, Final Fantasy style, card art, no text, high quality, 4k", "card_blackfire_arcanemissile", 5013),
    ("epic fantasy illustration of a mage overflowing with mana, blue energy exploding outward, Final Fantasy style, card art, no text, high quality, 4k", "card_blackfire_manasurge", 5014),
    # Thief
    ("epic fantasy illustration of an assassin delivering a killing blow, critical strike, red flash, Final Fantasy style, card art, no text, high quality, 4k", "card_thief_assassinate", 5021),
    ("epic fantasy illustration of a thief moving at super speed, wind trails, multiple afterimages, Final Fantasy style, card art, no text, high quality, 4k", "card_thief_winddash", 5022),
    ("epic fantasy illustration of a shadowy figure stepping through darkness, purple void, stealth, Final Fantasy style, card art, no text, high quality, 4k", "card_thief_shadowstep", 5023),
    ("epic fantasy illustration of eternal night falling, moon and stars, darkness covering the battlefield, Final Fantasy style, card art, no text, high quality, 4k", "card_thief_eternalnight", 5024),
    # White Mage
    ("epic fantasy illustration of resurrection, a golden phoenix rising from ashes, rebirth, Final Fantasy style, card art, no text, high quality, 4k", "card_holy_resurrection", 5031),
    ("epic fantasy illustration of a massive divine shield, golden barrier covering all allies, holy symbols, Final Fantasy style, card art, no text, high quality, 4k", "card_holy_divineshield", 5032),
    ("epic fantasy illustration of a holy smite from the sky, golden beam of light striking an enemy, Final Fantasy style, card art, no text, high quality, 4k", "card_holy_smite", 5033),
    ("epic fantasy illustration of a white mage praying, golden light surrounding them, peaceful aura, Final Fantasy style, card art, no text, high quality, 4k", "card_holy_prayer", 5034),
    # Dragoon
    ("epic fantasy illustration of a dragoon mastering the spear, golden aura around weapon, weapon mastery, Final Fantasy style, card art, no text, high quality, 4k", "card_dragoon_spearmastery", 5041),
    ("epic fantasy illustration of a dragoon impaling an enemy with a spear, dramatic thrust, Final Fantasy style, card art, no text, high quality, 4k", "card_dragoon_impale", 5042),
    ("epic fantasy illustration of a massive spear falling from the sky like a meteor, all enemies hit, Final Fantasy style, card art, no text, high quality, 4k", "card_dragoon_skyfallspear", 5043),
    # Dark Knight
    ("epic fantasy illustration of an abyssal blade, massive black sword with dark red energy, devastating attack, Final Fantasy style, card art, no text, high quality, 4k", "card_dark_abyssalblade", 5051),
    ("epic fantasy illustration of a dark knight surrounded by living death aura, undead energy, protection, Final Fantasy style, card art, no text, high quality, 4k", "card_dark_livingdead", 5052),
    ("epic fantasy illustration of a dark knight's soul reaver, massive dark energy blade draining life, Final Fantasy style, card art, no text, high quality, 4k", "card_dark_soulreaver", 5053),
    # Bard
    ("epic fantasy illustration of an encore performance, magical repeat effect, musical notes, Final Fantasy style, card art, no text, high quality, 4k", "card_bard_encore", 5061),
    ("epic fantasy illustration of a symphony, orchestra of magical instruments, massive buff, Final Fantasy style, card art, no text, high quality, 4k", "card_bard_symphony", 5062),
    ("epic fantasy illustration of a battle hymn, golden warrior spirits rising, Final Fantasy style, card art, no text, high quality, 4k", "card_bard_battlehymn", 5063),
    # Neutral
    ("epic fantasy illustration of a mana crystal shattering, blue energy explosion, Final Fantasy style, card art, no text, high quality, 4k", "card_neutral_manaburst", 5071),
    ("epic fantasy illustration of arcane intellect, floating magical books, knowledge, Final Fantasy style, card art, no text, high quality, 4k", "card_neutral_arcaneintellect", 5072),
]

for prompt, fname, seed in cards:
    print(f"\nGenerating: {fname}")
    result = generate_image(prompt, fname, seed=seed, w=768, h=1024, steps=25, cfg=7.5)
    if result:
        dst = os.path.join(ASSETS_DIR, "cards", f"{fname}.png")
        shutil.copy2(result, dst)
        print(f"  -> Copied to {dst}")

print("\nDone!")
