"use strict";
/**
 * @name sequelize/runner.ts
 * @desc The reason why this file exists comes from my experience using
 * sequelize for a couple years. Sometimes when we're running migrations,
 * we might encounter errors that we're OK with occuring such as attempting to
 * seed the same values or trying to remove a field that was already removed.
 *
 * I'm OK with these errors not stopping the migration script entirely.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    run: async (commands) => {
        for (let command of commands) {
            try {
                await command();
            }
            catch (err) {
                if (err.original) {
                    switch (err.original.code) {
                        /**
                         * This is an error that we can run into while seeding the same
                         * data. It's passable.
                         */
                        case "ER_DUP_ENTRY":
                            console.log(`>>> Passable error occurred: ER_DUP_ENTRY`);
                            return;
                        /**
                         * This is an error that we can run into where the same
                         * field name already exists.
                         */
                        case "ER_DUP_FIELDNAME":
                            console.log(`>>> Passable error occurred: ER_DUP_FIELDNAME`);
                            return;
                        /**
                         * If the field doesn't exist and we're trying to drop it,
                         * that's cool. We can pass this.
                         */
                        case "ER_CANT_DROP_FIELD_OR_KEY":
                            console.log(`>>> Passable error occurred: ER_CANT_DROP_FIELD_OR_KEY`);
                            return;
                        case "SequelizeUnknownConstraintError":
                            console.log(`>>> Passable error. Trying to remove constraint that's already been removed.`);
                            return;
                        default:
                            console.log(err);
                            throw new Error(err);
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2VxdWVsaXplL3J1bm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7O0dBUUc7O0FBRUgsa0JBQWU7SUFDYixHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQW9CLEVBQUUsRUFBRTtRQUNsQyxLQUFLLElBQUksT0FBTyxJQUFJLFFBQVEsRUFBRTtZQUM1QixJQUFJO2dCQUNGLE1BQU0sT0FBTyxFQUFFLENBQUM7YUFDakI7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7b0JBQ2hCLFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7d0JBRXpCOzs7MkJBR0c7d0JBRUgsS0FBSyxjQUFjOzRCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7NEJBQ3hELE9BQU87d0JBRVQ7OzsyQkFHRzt3QkFFSCxLQUFLLGtCQUFrQjs0QkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFBOzRCQUM1RCxPQUFPO3dCQUdUOzs7MkJBR0c7d0JBRUgsS0FBSywyQkFBMkI7NEJBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELENBQUMsQ0FBQTs0QkFDckUsT0FBTzt3QkFFVCxLQUFLLGlDQUFpQzs0QkFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4RUFBOEUsQ0FBQyxDQUFBOzRCQUMzRixPQUFPO3dCQUVUOzRCQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3hCO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7Q0FDRixDQUFBIn0=