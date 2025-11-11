local Rayfield = loadstring(game:HttpGet('https://sirius.menu/rayfield'))()

local Window = Rayfield:CreateWindow({
   Name = "⭕💴 Hub（Beta测试版本）",
   Icon = 0, -- Icon in Topbar. Can use Lucide Icons (string) or Roblox Image (number). 0 to use no icon (default).
   LoadingTitle = "⭕④你⑧了",
   LoadingSubtitle = "by 最牛逼的猎奇回战作者",
   ShowText = "⭕💴", -- for mobile users to unhide rayfield, change if you'd like
   Theme = "Default", -- Check https://docs.sirius.menu/rayfield/configuration/themes

   ToggleUIKeybind = "K", -- The keybind to toggle the UI visibility (string like "K" or Enum.KeyCode)

   DisableRayfieldPrompts = false,
   DisableBuildWarnings = false, -- Prevents Rayfield from warning when the script has a version mismatch with the interface

   ConfigurationSaving = {
      Enabled = true,
      FolderName = lqhzhub, -- Create a custom folder for your hub/game
      FileName = "⭕💴 Hub"
   },

   Discord = {
      Enabled = false, -- Prompt the user to join your Discord server if their executor supports it
      Invite = "noinvitelink", -- The Discord invite code, do not include discord.gg/. E.g. discord.gg/ ABCD would be ABCD
      RememberJoins = true -- Set this to false to make them join the discord every time they load it up
   },

   KeySystem = true, -- Set this to true to use our key system
   KeySettings = {
      Title = "输入密钥即可使用",
      Subtitle = "不输入就⭕④你",
      Note = "加入猎奇回战群群公告即可找到（384441662）", -- Use this to tell the user how to get a key
      FileName = "Key", -- It is recommended to use something unique as other scripts using Rayfield may overwrite your key file
      SaveKey = true, -- The user's key will be saved, but if you change the key, they will be unable to use your script
      GrabKeyFromSite = false, -- If this is true, set Key below to the RAW site you would like Rayfield to get the key from
      Key = {"30072025"} -- List of keys that will be accepted by the system, can be RAW file links (pastebin, github etc) or simple strings ("hello","key22")
   }
})


local Tab = Window:CreateTab("⭕💴模式", 4483362458) -- Title, Image
local Section = Tab:CreateSection("需要把两个选项都打开，你只开一个是不会好使的")
local Section = Tab:CreateSection("把Kuro往④里⭕")
local Toggle = Tab:CreateToggle({
   Name = "自动接拯救村庄任务（Kuro Boss）",
   CurrentValue = false,
   Flag = "kuroquestfarm", -- A flag is the identifier for the configuration file, make sure every element has a different flag if you're using configuration saving to ensure no overlaps
   Callback = function(Value)
   -- The function that takes place when the toggle is pressed
   -- The variable (Value) is a boolean on whether the toggle is true or false
   end,
})
local Toggle = Tab:CreateToggle({
   Name = "开⭕Kuro",
   CurrentValue = false,
   Flag = "kurobossfarm", -- A flag is the identifier for the configuration file, make sure every element has a different flag if you're using configuration saving to ensure no overlaps
   Callback = function(Value)
   -- The function that takes place when the toggle is pressed
   -- The variable (Value) is a boolean on whether the toggle is true or false
   end,
})
local Section = Tab:CreateSection("把手指容器往④里打")
local Toggle = Tab:CreateToggle({
   Name = "自动接手指容器任务（Finger Bearer Boss）",
   CurrentValue = false,
   Flag = "fingerquestfarm", -- A flag is the identifier for the configuration file, make sure every element has a different flag if you're using configuration saving to ensure no overlaps
   Callback = function(Value)
   -- The function that takes place when the toggle is pressed
   -- The variable (Value) is a boolean on whether the toggle is true or false
   end,
})
local Toggle = Tab:CreateToggle({
   Name = "往④里掏手指",
   CurrentValue = false,
   Flag = "fingerbossfarm", -- A flag is the identifier for the configuration file, make sure every element has a different flag if you're using configuration saving to ensure no overlaps
   Callback = function(Value)
   -- The function that takes place when the toggle is pressed
   -- The variable (Value) is a boolean on whether the toggle is true or false
   end,
})
local TabCre = Window:CreateTab("最牛逼的人", 4483362458) -- Title, Image
local Label = TabCre:CreateLabel("猎奇回战作者P4XT0N，良心作者脚本用不收费，倒卖或者举报者全价40k大头照秒出，猎奇回战群384441662", 4483362458, Color3.fromRGB(255, 255, 255), false) -- Title, Icon, Color, IgnoreTheme

local TabMisc = Window:CreateTab("其他", 4483362458) -- Title, Image
local Button = TabMisc:CreateButton({
   Name = "加载最牛逼脚本Infinite Yield",
   Callback = function()
   loadstring(game:HttpGet('https://raw.githubusercontent.com/DarkNetworks/Infinite-Yield/main/latest.lua'))()
   end,
})
local Button = TabMisc:CreateButton({
   Name = "神秘🔞换装小脚本（家人在附近慎用！！）",
   Callback = function()
   loadstring(game:HttpGet('https://raw.githubusercontent.com/p4xt0n3/lqhzhub/refs/heads/main/sus.lua'))()
   end,
})
local Button = TabMisc:CreateButton({
   Name = "抹除⭕💴脚本",
   Callback = function()
   Rayfield:Destroy()
   end,
})

Rayfield:Notify({
   Title = "成功启用⭕💴脚本",
   Content = "用完后你会发现⭕④你⑧了",
   Duration = 6.5,
   Image = 4483362458,
})

Rayfield:LoadConfiguration()
