
/**
 * @name sequelize/runner.ts
 * @desc The reason why this file exists comes from my experience using
 * sequelize for a couple years. Sometimes when we're running migrations,
 * we might encounter errors that we're OK with occuring such as attempting to
 * seed the same values or trying to remove a field that was already removed.
 * 
 * I'm OK with these errors not stopping the migration script entirely.
 */

export default {
  run: async (commands: Function[]) => {
    for (let command of commands) {
      try {
        await command();
      } catch (err) {
        if (err.original) {
          switch (err.original.code) {
  
            /**
             * This is an error that we can run into while seeding the same
             * data. It's passable.
             */
  
            case "ER_DUP_ENTRY":
              console.log(`>>> Passable error occurred: ER_DUP_ENTRY`)
              return;
  
            /**
             * This is an error that we can run into where the same
             * field name already exists.
             */
  
            case "ER_DUP_FIELDNAME":
              console.log(`>>> Passable error occurred: ER_DUP_FIELDNAME`)
              return;
  
            
            /**
             * If the field doesn't exist and we're trying to drop it,
             * that's cool. We can pass this.
             */
  
            case "ER_CANT_DROP_FIELD_OR_KEY":
              console.log(`>>> Passable error occurred: ER_CANT_DROP_FIELD_OR_KEY`)
              return;
  
            case "SequelizeUnknownConstraintError":
              console.log(`>>> Passable error. Trying to remove constraint that's already been removed.`)
              return;
  
            default:
              console.log(err);
              throw new Error(err);
          }
        }
      }
    }
  }
}