import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Tag } from 'lucide-react';
import './Card.css';

const Card = ({ title, description, url, image, tags }) => {
    return (
        <motion.div
            className="card"
            whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="card-image-container">
                {image ? (
                    <img src={image} alt={title} className="card-image" loading="lazy" />
                ) : (
                    <div className="card-placeholder" style={{ backgroundColor: 'var(--color-primary)' }}>
                        <span>{title[0]}</span>
                    </div>
                )}
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>

                <div className="card-tags">
                    {tags && tags.split(',').map((tag, index) => (
                        <span key={index} className="tag">
                            <Tag size={12} style={{ marginRight: 4 }} />
                            {tag.trim()}
                        </span>
                    ))}
                </div>

                <a href={url} target="_blank" rel="noopener noreferrer" className="card-button">
                    Visit <ExternalLink size={16} style={{ marginLeft: 6 }} />
                </a>
            </div>
        </motion.div>
    );
};

export default Card;
