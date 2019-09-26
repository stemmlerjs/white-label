'use strict';
import runner from '../runner'

export default {
  up: (queryInterface, Sequelize) => {
    const CREATE_BASE_USER = () => (
      queryInterface.createTable('base_user', {
        base_user_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        first_name: {
          type: Sequelize.STRING(250),
          allowNull: false
        },
        last_name: {
          type: Sequelize.STRING(250),
          allowNull: false
        },
        user_email: {
          type: Sequelize.STRING(250),
          allowNull: false,
          unique: true
        },
        user_password: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        },
        is_email_verified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        username: {
          type: Sequelize.STRING(250),
          allowNull: true
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
      })
    )

    const CREATE_ARTIST = () => (
      queryInterface.createTable('artist', {
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
      })
    )

    const CREATE_VINYL = () => (
      queryInterface.createTable('vinyl', {
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
      })
    )

    const CREATE_TRADER = () => (
      queryInterface.createTable('trader', {
        trader_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        trader_base_id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'base_user',
            key: 'base_user_id'
          }, 
          onDelete: 'cascade',
          onUpdate: 'cascade',
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
      })
    )

    return runner.run([
      () => CREATE_BASE_USER(),
      () => CREATE_ARTIST(),
      () => CREATE_VINYL(),
      () => CREATE_TRADER()
    ])
  },

  down: (queryInterface, Sequelize) => {
    return runner.run([
      () => queryInterface.dropTable('artist'),
      () => queryInterface.dropTable('vinyl'),
      () => queryInterface.dropTable('trader'),
      () => queryInterface.dropTable('base_user')
    ])
  }
};
