'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = __importDefault(require("../runner"));
exports.default = {
    up: (queryInterface, Sequelize) => {
        const CREATE_ARTIST = () => (queryInterface.createTable('artist', {
            artist_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            artist_name: {
                type: Sequelize.STRING(250),
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        }));
        const CREATE_VINYL = () => (queryInterface.createTable('vinyl', {
            vinyl_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(250),
                allowNull: false
            },
            artist_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'artist',
                    key: 'artist_id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        }));
        return runner_1.default.run([
            () => CREATE_ARTIST(),
            () => CREATE_VINYL()
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return runner_1.default.run([
            () => queryInterface.dropTable('vinyl'),
            () => queryInterface.dropTable('artist')
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAxOTA2MjUxMzE4MDgtaW5pdGlhbC1taWdyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXF1ZWxpemUvbWlncmF0aW9ucy8yMDE5MDYyNTEzMTgwOC1pbml0aWFsLW1pZ3JhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7O0FBQ2IsdURBQThCO0FBRTlCLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLENBQUMsY0FBYyxFQUFFLFNBQVMsRUFBRSxFQUFFO1FBQ2hDLE1BQU0sYUFBYSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQzFCLGNBQWMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQ25DLFNBQVMsRUFBRTtnQkFDVCxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3BCLFlBQVksRUFBRSxTQUFTLENBQUMsTUFBTTtnQkFDOUIsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLFVBQVUsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDM0IsU0FBUyxFQUFFLEtBQUs7YUFDakI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2dCQUNwQixTQUFTLEVBQUUsS0FBSztnQkFDaEIsWUFBWSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUM7YUFDckQ7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2dCQUNwQixTQUFTLEVBQUUsS0FBSztnQkFDaEIsWUFBWSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsK0NBQStDLENBQUM7YUFDakY7U0FDRixDQUFDLENBQ0gsQ0FBQTtRQUVELE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQ3pCLGNBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ2xDLFFBQVEsRUFBRTtnQkFDUixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3BCLFlBQVksRUFBRSxTQUFTLENBQUMsTUFBTTtnQkFDOUIsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLFVBQVUsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDM0IsU0FBUyxFQUFFLEtBQUs7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2dCQUNwQixTQUFTLEVBQUUsS0FBSztnQkFDaEIsVUFBVSxFQUFFO29CQUNWLEtBQUssRUFBRSxRQUFRO29CQUNmLEdBQUcsRUFBRSxXQUFXO2lCQUNoQjtnQkFDRixRQUFRLEVBQUUsU0FBUztnQkFDbkIsUUFBUSxFQUFFLFNBQVM7YUFDcEI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2dCQUNwQixTQUFTLEVBQUUsS0FBSztnQkFDaEIsWUFBWSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUM7YUFDckQ7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2dCQUNwQixTQUFTLEVBQUUsS0FBSztnQkFDaEIsWUFBWSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsK0NBQStDLENBQUM7YUFDakY7U0FDRixDQUFDLENBQ0gsQ0FBQTtRQUVELE9BQU8sZ0JBQU0sQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFO1lBQ3JCLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRTtTQUNyQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLFNBQVMsRUFBRSxFQUFFO1FBQ2xDLE9BQU8sZ0JBQU0sQ0FBQyxHQUFHLENBQUM7WUFDaEIsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDdkMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7U0FDekMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMifQ==