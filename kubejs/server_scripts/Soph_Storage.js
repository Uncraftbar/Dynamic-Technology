ServerEvents.recipes(event => {

    //sophisticated backpack upgrade
    const sophBackpacksMaterials = [
        ["", null, null],
        ["iron_", "bronze"],
        ["gold_", "brass"],
        ["diamond_", "steel"],
    ]
    sophBackpacksMaterials.forEach((material, index) => {
        if (index == 0) return;

        let outputBackpack = `sophisticatedbackpacks:${material[0]}backpack`
        let inputBackpack = `sophisticatedbackpacks:${sophBackpacksMaterials[index - 1][0]}backpack`
        event.remove({ mod: "sophisticatedbackpacks", output: outputBackpack })
        event.custom({
            "neoforge:conditions": [
              {
                "type": "sophisticatedcore:item_enabled",
                "itemRegistryName": "outputBackpack"
              }
            ],
            "type": "sophisticatedbackpacks:backpack_upgrade",
            "category": "misc",
            "key": {
              "B": {
                "item": inputBackpack
              },
              "I": {
                "tag": (`c:ingots/${material[1]}`)
              }
            },
            "pattern": [
              "III",
              "IBI",
              "III"
            ],
            "result": {
              "count": 1,
              "id": outputBackpack
            }
          });
    })

    //Sophisticated chests, Barrels, Shulker upgrade
    const sophStorageMaterials = [
        ["", null, null],
        ["iron_", "bronze"],
        ["gold_", "brass"],
        ["diamond_", "steel"],
    ]
    const sophStorageTypes = [
        ["", "barrel"],
        ["", "chest"],
        ["", "shulker_box"],
        ["limited_", "barrel_1"],
        ["limited_", "barrel_2"],
        ["limited_", "barrel_3"],
        ["limited_", "barrel_4"]
    ]


    sophStorageMaterials.forEach((material, toIndex) => {
        if (toIndex == 0) return;


        sophStorageTypes.forEach(storageType => {
            let outputStorage = `sophisticatedstorage:${storageType[0]}${material[0]}${storageType[1]}`
            let inputStorage = `sophisticatedstorage:${storageType[0]}${sophStorageMaterials[toIndex - 1][0]}${storageType[1]}`
            event.remove({ mod: "sophisticatedstorage", output: outputStorage })
            event.custom({
                "neoforge:conditions": [
                  {
                    "type": "sophisticatedcore:item_enabled",
                    "itemRegistryName": outputStorage
                  }
                ],
                "type": "sophisticatedstorage:storage_tier_upgrade",
                "category": "misc",
                "key": {
                  "C": {
                    "tag": (`c:ingots/${material[1]}`)
                  },
                  "S": {
                    "item": inputStorage
                  }
                },
                "pattern": [
                  "CCC",
                  "CSC",
                  "CCC"
                ],
                "result": {
                  "count": 1,
                  "id": outputStorage
                }
              });
        })
    })

    //Item Tier Upgrades
    function tiers(output, replace, input) {
        event.replaceInput(
            { id: output },
            replace,
            input
          )
    }
  
    //Now we can make many 'potting' recipes without typing that huge block over and over!
    //    tiers("sophisticatedstorage:_tier_upgrade", "minecraft:" "c:ingots/")
    tiers("sophisticatedstorage:basic_to_iron_tier_upgrade", "minecraft:iron_ingot", "#c:ingots/bronze")
    tiers("sophisticatedstorage:basic_to_gold_tier_upgrade", "minecraft:gold_ingot", "#c:ingots/brass")
    tiers("sophisticatedstorage:basic_to_diamond_tier_upgrade", "minecraft:diamond", "#c:ingots/steel")
    tiers("sophisticatedstorage:copper_to_iron_tier_upgrade", "minecraft:iron_ingot", "#c:ingots/bronze")
    tiers("sophisticatedstorage:copper_to_gold_tier_upgrade", "minecraft:gold_ingot", "#c:ingots/brass")
    tiers("sophisticatedstorage:copper_to_diamond_tier_upgrade", "minecraft:diamond", "#c:ingots/steel")
    tiers("sophisticatedstorage:iron_to_gold_tier_upgrade", "minecraft:gold_ingot", "#c:ingots/brass")
    tiers("sophisticatedstorage:iron_to_diamond_tier_upgrade", "minecraft:diamond", "#c:ingots/steel")
    tiers("sophisticatedstorage:gold_to_diamond_tier_upgrade", "minecraft:diamond", "#c:ingots/steel")

    function copper(output, type, container) {
    event.custom({
            "neoforge:conditions": [
              {
                "type": "sophisticatedcore:item_enabled",
                "itemRegistryName": output
              }
            ],
            "type": type,
            "category": "misc",
            "key": {
              "B": {
                "item": container
              },
              "I": {
                "tag": "c:ingots/bronze"
              }
            },
            "pattern": [
              " I ",
              "IBI",
              " I "
            ],
            "result": {
              "count": 1,
              "id": output
            }
          })
}

    copper("sophisticatedbackpacks:iron_backpack", "sophisticatedbackpacks:backpack_upgrade", "sophisticatedbackpacks:copper_backpack")
    copper("sophisticatedstorage:iron_barrel", "sophisticatedstorage:storage_tier_upgrade", "sophisticatedstorage:copper_barrel")
    copper("sophisticatedstorage:iron_chest", "sophisticatedstorage:storage_tier_upgrade", "sophisticatedstorage:copper_chest")
    copper("sophisticatedstorage:iron_shulker", "sophisticatedstorage:storage_tier_upgrade", "sophisticatedstorage:copper_shulker")
    copper("sophisticatedstorage:limited_iron_barrel_1", "sophisticatedstorage:storage_tier_upgrade", "sophisticatedstorage:limited_copper_barrel_1")
    copper("sophisticatedstorage:limited_iron_barrel_2", "sophisticatedstorage:storage_tier_upgrade", "sophisticatedstorage:limited_copper_barrel_2")
    copper("sophisticatedstorage:limited_iron_barrel_3", "sophisticatedstorage:storage_tier_upgrade", "sophisticatedstorage:limited_copper_barrel_3")
    copper("sophisticatedstorage:limited_iron_barrel_4", "sophisticatedstorage:storage_tier_upgrade", "sophisticatedstorage:limited_copper_barrel_4")
})