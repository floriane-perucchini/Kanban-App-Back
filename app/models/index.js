const Card = require('./card.js');
const List = require('./list.js');
const Tag = require('./tag.js');

List.hasMany(Card, {
    as: 'cards', 
    foreignKey: "list_id"
});
Card.belongsTo(List, {
    as: 'list',
    foreignKey: "list_id"
})

// CARD / TAG
// relation n:n entre les cartes et les tags
Card.belongsToMany(Tag, {
    as: 'tags',
    through: 'card_has_tag',
    foreignKey: 'card_id',
    otherKey: 'tag_id',
    updatedAt: false
});
Tag.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_tag',
    foreignKey: 'tag_id',
    otherKey: 'card_id',
    updatedAt: false
});

module.exports = { Card, List, Tag };