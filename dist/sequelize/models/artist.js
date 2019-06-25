module.exports = function (sequelize, DataTypes) {
    return sequelize.define('artist', {
        artist_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        artist_name: {
            type: DataTypes.STRING(250),
            allowNull: false
        }
    }, {
        /**
         * Tell sequelize to add "createdAt" and "updatedAt" columns.
         */
        timestamps: true,
        /**
         * Force sequelize to use underscored auto-generated column names.
         * Therefore: createdAt, updatedAt => created_at, updated_at
         */
        underscored: true,
        tableName: 'artist'
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VxdWVsaXplL21vZGVscy9hcnRpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFTLFNBQVMsRUFBRSxTQUFTO0lBQzVDLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDaEMsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO1lBQ3BCLFlBQVksRUFBRSxTQUFTLENBQUMsTUFBTTtZQUM5QixTQUFTLEVBQUUsS0FBSztZQUNoQixVQUFVLEVBQUUsSUFBSTtTQUNqQjtRQUNELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUMzQixTQUFTLEVBQUUsS0FBSztTQUNqQjtLQUNGLEVBQUM7UUFFQTs7V0FFRztRQUVILFVBQVUsRUFBRSxJQUFJO1FBRWhCOzs7V0FHRztRQUVILFdBQVcsRUFBRSxJQUFJO1FBQ2pCLFNBQVMsRUFBRSxRQUFRO0tBQ3BCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9