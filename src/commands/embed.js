// -----------------
// Global variables
// -----------------

const colors = require("../core/colors");
const db = require("../core/db");
const logger = require("../core/logger");

// -------------
// Command Code
// -------------

module.exports.run = function(data)
{
   // -------------------------------
   // Command allowed by admins only
   // -------------------------------

   if (!data.message.isAdmin)
   {
      data.color = "warn";
      data.text = ":cop:  This command is reserved for server administrators.";

      // -------------
      // Send message
      // -------------

      return data.message.channel.send({
         embed: {
            description: data.text,
            color: colors.get(data.color)
         }
      });
   }

   // -----------------------------------
   // Error if settings param is missing
   // -----------------------------------

   if (!data.cmd.params)
   {
      data.color = "error";
      data.text =
         ":warning:  Missing `embed` parameter. Use `" +
         `${data.config.translateCmdShort} help settings\` to learn more.`;

      // -------------
      // Send message
      // -------------

      return data.message.channel.send({
         embed: {
            description: data.text,
            color: colors.get(data.color)
         }
      });
   }

   // ----------------
   // Execute setting
   // ----------------

   embedSettings(data);
};

// -------------------------------
// embed varible command handaler
// -------------------------------

const embedSettings = function(data)
{
   const commandVariable1 = data.cmd.params.split(" ")[0].toLowerCase();

   if (commandVariable1 === "on" || commandVariable1 === "off")
   {
      console.log(commandVariable1);
      return db.updateEmbedVar(
         data.message.channel.guild.id,
         commandVariable1,
         function(err)
         {
            if (err)
            {
               return logger("error", err);
            }
            var output =
            "**```Embedded Translation```**\n" +
            `Embedded Message translation is now turned : ${commandVariable1}\n\n`;
            data.color = "info";
            data.text = output;

            // -------------
            // Send message
            // -------------

            return data.message.channel.send({
               embed: {
                  description: data.text,
                  color: colors.get(data.color)
               }
            });
         }
      );
   }

   data.color = "error";
   data.text =
      ":warning:  **`" + commandVariable1 +
      "`** is not a valid embed option.\n";

   // -------------
   // Send message
   // -------------

   return data.message.channel.send({
      embed: {
         description: data.text,
         color: colors.get(data.color)
      }
   });
};