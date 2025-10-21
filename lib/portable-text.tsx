// Portable text renderer utility for Business Chicks theme
// Handles rich text content from the CMS

import React from 'react';

export interface PortableTextSpan {
  _key: string;
  _type: "span";
  text: string;
  marks: string[];
}

export interface PortableTextBlock {
  _key: string;
  _type: "block";
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  level?: number;
  listItem?: "bullet" | "number";
  children: PortableTextSpan[];
  markDefs: unknown[];
}

export type PortableText = PortableTextBlock[];

// Simple portable text renderer component
export const PortableTextRenderer: React.FC<{ content: PortableText }> = ({ content }) => {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className="prose prose-lg max-w-none">
      {content.map((block) => {
        if (block._type !== 'block') {
          return null;
        }

        const { style, children, listItem } = block;
        
        // Handle list items
        if (listItem) {
          const ListTag = listItem === 'bullet' ? 'ul' : 'ol';
          return (
            <ListTag key={block._key} className="list-disc list-inside space-y-2">
              <li className="text-text-secondary leading-relaxed">
                {children.map((span) => (
                  <span key={span._key}>{span.text}</span>
                ))}
              </li>
            </ListTag>
          );
        }

        // Handle headings
        if (style && style.startsWith('h')) {
          const HeadingTag: React.ElementType = style as unknown as React.ElementType;
          return (
            <HeadingTag key={block._key} className="text-text-primary font-semibold mb-4">
              {children.map((span) => (
                <span key={span._key}>{span.text}</span>
              ))}
            </HeadingTag>
          );
        }

        // Handle normal paragraphs
        return (
          <p key={block._key} className="text-text-secondary leading-relaxed mb-4">
            {children.map((span) => (
              <span key={span._key}>{span.text}</span>
            ))}
          </p>
        );
      })}
    </div>
  );
};

// Utility function to extract plain text from portable text
export const extractPlainText = (content: PortableText): string => {
  if (!content || !Array.isArray(content)) {
    return '';
  }

  return content
    .map((block) => {
      if (block._type === 'block' && block.children) {
        return block.children.map((span) => span.text).join('');
      }
      return '';
    })
    .join(' ')
    .trim();
};

// Utility function to check if portable text is empty
export const isPortableTextEmpty = (content: PortableText): boolean => {
  return !content || content.length === 0 || extractPlainText(content).length === 0;
};
